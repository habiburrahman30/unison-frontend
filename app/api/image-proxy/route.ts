import { NextRequest } from "next/server";
import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

const BLOCKED_HOSTNAMES = new Set(["localhost", "0.0.0.0", "127.0.0.1", "::1"]);

// Manufacturer product photos are often huge, unresized camera originals
// (multi-MB, several-thousand-px wide) served slowly by the source site.
// We shrink them once and cache the result on disk so every later request
// (any visitor) is served instantly instead of waiting on the slow origin.
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 78;
const CACHE_DIR = path.join(process.cwd(), ".cache", "image-proxy");
const UPSTREAM_TIMEOUT_MS = 90000;
const MAX_UPSTREAM_BYTES = 25 * 1024 * 1024;

function isBlockedHostname(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (BLOCKED_HOSTNAMES.has(host)) return true;
  return (
    host.startsWith("127.") ||
    host.startsWith("10.") ||
    host.startsWith("192.168.") ||
    host.startsWith("169.254.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
  );
}

function cacheFileFor(url: string, ext: string): string {
  const hash = createHash("sha256").update(url).digest("hex");
  return path.join(CACHE_DIR, `${hash}.${ext}`);
}

async function readCached(url: string): Promise<{ buffer: Buffer; contentType: string } | null> {
  for (const [ext, contentType] of [
    ["jpg", "image/jpeg"],
    ["png", "image/png"],
  ] as const) {
    try {
      const buffer = await fs.readFile(cacheFileFor(url, ext));
      return { buffer, contentType };
    } catch {
      // not cached under this extension, try the next
    }
  }
  return null;
}

async function writeCached(url: string, ext: string, buffer: Buffer): Promise<void> {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(cacheFileFor(url, ext), buffer);
}

function respond(buffer: Buffer, contentType: string): Response {
  const headers = new Headers();
  headers.set("Content-Type", contentType);
  headers.set("Content-Length", String(buffer.byteLength));
  headers.set("Cache-Control", "public, max-age=86400, s-maxage=604800, immutable");
  return new Response(new Uint8Array(buffer), { status: 200, headers });
}

// Proxies and resizes external product images (manufacturer URLs, which may
// be http:// and/or multi-MB unresized originals) through our own HTTPS
// domain: fixes mixed-content blocking and slow load times in one place.
export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("url");

  if (!target) {
    return new Response("Missing url parameter", { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return new Response("Invalid url parameter", { status: 400 });
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return new Response("Unsupported protocol", { status: 400 });
  }

  if (isBlockedHostname(parsed.hostname)) {
    return new Response("Host not allowed", { status: 400 });
  }

  const normalizedUrl = parsed.toString();

  const cached = await readCached(normalizedUrl);
  if (cached) {
    return respond(cached.buffer, cached.contentType);
  }

  let upstream: Response;
  try {
    upstream = await fetch(normalizedUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; UnisonImageProxy/1.0)" },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      redirect: "follow",
    });
  } catch {
    return new Response("Failed to fetch image", { status: 502 });
  }

  if (!upstream.ok) {
    return new Response("Failed to fetch image", { status: 502 });
  }

  const contentType = upstream.headers.get("content-type") || "";
  if (!contentType.startsWith("image/")) {
    return new Response("Upstream is not an image", { status: 502 });
  }

  const contentLength = upstream.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_UPSTREAM_BYTES) {
    return new Response("Image too large", { status: 502 });
  }

  const arrayBuffer = await upstream.arrayBuffer();
  if (arrayBuffer.byteLength > MAX_UPSTREAM_BYTES) {
    return new Response("Image too large", { status: 502 });
  }
  const original = Buffer.from(arrayBuffer);

  let resized: Buffer;
  let outExt: "jpg" | "png";
  let outContentType: string;
  try {
    const image = sharp(original).rotate();
    const metadata = await image.metadata();
    const resizeOpts = { width: MAX_WIDTH, withoutEnlargement: true };

    if (metadata.hasAlpha) {
      resized = await image.resize(resizeOpts).png({ compressionLevel: 8 }).toBuffer();
      outExt = "png";
      outContentType = "image/png";
    } else {
      resized = await image
        .resize(resizeOpts)
        .flatten({ background: "#ffffff" })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toBuffer();
      outExt = "jpg";
      outContentType = "image/jpeg";
    }
  } catch {
    // Not something sharp can decode/re-encode (or already tiny/simple) — fall back to the original bytes.
    resized = original;
    outExt = contentType.includes("png") ? "png" : "jpg";
    outContentType = contentType;
  }

  await writeCached(normalizedUrl, outExt, resized);

  return respond(resized, outContentType);
}
