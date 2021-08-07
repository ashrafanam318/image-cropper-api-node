import express from "express";
import path from "path";
import { IMAGE_ASSETS_DIR, THUMBNAIL_ASSETS_DIR } from "../config";
import sharp from "sharp";

export default async (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void> => {
  const { filename, height, width } = req.query;

  if (typeof filename === "string" && filename !== "") {
    const thumbPath = path.join(
      THUMBNAIL_ASSETS_DIR,
      `${filename as string}.jpg`
    );
    const imagePath = path.join(IMAGE_ASSETS_DIR, `${filename as string}.jpg`);

    if (!height && !width) {
      res.sendFile(imagePath);
      return;
    }

    try {
      const metadata = await sharp(thumbPath + "jljkj").metadata();
      if (
        metadata.height === Number(height) &&
        metadata.width === Number(width)
      ) {
        res.sendFile(thumbPath);
        return;
      }
    } catch (error) {
      next();
      return;
    }
  }
  next();
};
