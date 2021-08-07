import sharp from "sharp";
import path from "path";
import { promises as fs } from "fs";
import { IMAGE_ASSETS_DIR, THUMBNAIL_ASSETS_DIR } from "../config";

export const resizeImage = async (
  imageName: string,
  height?: number,
  width?: number
): Promise<string | null> => {
  let ih: number | null = null;
  let iw: number | null = null;

  if (typeof height === "number" && height >= 0) {
    ih = height;
  }
  if (typeof width === "number" && width >= 0) {
    iw = width;
  }

  try {
    const thumbPath = `${THUMBNAIL_ASSETS_DIR}/${imageName}.jpg`;
    const imagePath = path.join(IMAGE_ASSETS_DIR, `${imageName}.jpg`);

    try {
      await fs.unlink(thumbPath);
      // removed file
    } catch {
      // no file existed
    }

    await sharp(imagePath).resize(iw, ih).toFile(thumbPath);

    return thumbPath;
  } catch (error: unknown) {
    return null;
  }
};
