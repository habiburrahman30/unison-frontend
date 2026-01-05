import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const originalName = file.name.replace(/\s+/g, "-");
    const fileExtension = path.extname(originalName);
    const fileName = `brand-${timestamp}-${randomString}${fileExtension}`;

    // Define upload directory
    const uploadDir = path.join(process.cwd(), "public", "uploads", "brand");

    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Save file
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Return URL path (accessible from browser)
    const fileUrl = `/uploads/brand/${fileName}`;

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url: fileUrl,
        filename: fileName,
      },
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload file" },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove uploaded logos
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, message: "Image URL is required" },
        { status: 400 }
      );
    }

    // Extract filename from URL
    const filename = imageUrl.split("/").pop();

    if (!filename) {
      return NextResponse.json(
        { success: false, message: "Invalid image URL" },
        { status: 400 }
      );
    }

    // Construct file path
    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "brand",
      filename
    );

    // Check if file exists and delete it
    if (existsSync(filePath)) {
      await unlink(filePath);
      console.log(`Deleted file: ${filePath}`);
      return NextResponse.json({
        success: true,
        message: "File deleted successfully",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "File not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete file" },
      { status: 500 }
    );
  }
}
