import { unlink } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

/**
 * Delete an uploaded file by its URL path
 * @param imageUrl - The URL path of the image (e.g., /uploads/category/image.jpg)
 * @param folder - The folder name (e.g., 'category', 'product', 'brand')
 * @returns Promise<boolean> - true if deleted, false if not found
 */
export async function deleteUploadedFile(
  imageUrl: string,
  folder: string = "category"
): Promise<boolean> {
  try {
    if (!imageUrl) {
      return false;
    }

    // Extract filename from URL
    const filename = imageUrl.split("/").pop();

    if (!filename) {
      console.error("Invalid image URL:", imageUrl);
      return false;
    }

    // Construct file path
    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      folder,
      filename
    );

    // Check if file exists
    if (!existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return false;
    }

    // Delete the file
    await unlink(filePath);
    console.log(`✅ Successfully deleted: ${filePath}`);
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
}

/**
 * Delete multiple uploaded files
 * @param imageUrls - Array of image URL paths
 * @param folder - The folder name
 * @returns Promise<number> - Number of successfully deleted files
 */
export async function deleteUploadedFiles(
  imageUrls: string[],
  folder: string = "category"
): Promise<number> {
  let deletedCount = 0;

  for (const imageUrl of imageUrls) {
    const deleted = await deleteUploadedFile(imageUrl, folder);
    if (deleted) {
      deletedCount++;
    }
  }

  return deletedCount;
}
