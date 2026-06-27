import { NextRequest } from "next/server";
import { ApiResponse } from "@/lib/utils/response";
import { writeFile, mkdir, unlink, access } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) return ApiResponse.error("No file provided", 400);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads/teams");
    await mkdir(uploadDir, { recursive: true });

    const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    return ApiResponse.success(
      { url: `/uploads/teams/${filename}` },
      "Image uploaded successfully",
      201,
    );
  } catch (error: any) {
    return ApiResponse.error("Failed to upload image", 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();
    if (!imageUrl) return ApiResponse.error("No image URL provided", 400);

    const filepath = path.join(process.cwd(), "public", imageUrl);

    try {
      await access(filepath);
      await unlink(filepath);
    } catch {
      // File doesn't exist — ignore
    }

    return ApiResponse.success(null, "Image deleted successfully");
  } catch (error: any) {
    return ApiResponse.error("Failed to delete image", 500);
  }
}
