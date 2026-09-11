import { NextRequest } from "next/server";

const BLOCKED_HOSTNAMES = new Set(["localhost", "0.0.0.0", "127.0.0.1", "::1"]);

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

// Proxies external images (e.g. manufacturer URLs saved with an http:// origin)
// through our own HTTPS domain so browsers don't block them as mixed content.
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

  let upstream: Response;
  try {
    upstream = await fetch(parsed.toString(), {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; UnisonImageProxy/1.0)" },
      signal: AbortSignal.timeout(20000),
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
  if (contentLength && Number(contentLength) > 20 * 1024 * 1024) {
    return new Response("Image too large", { status: 502 });
  }

  const headers = new Headers();
  headers.set("Content-Type", contentType);
  if (contentLength) headers.set("Content-Length", contentLength);
  headers.set("Cache-Control", "public, max-age=86400, s-maxage=604800, immutable");

  return new Response(upstream.body, { status: 200, headers });
}
