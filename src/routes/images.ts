import { Router, Request, Response } from "express";
import path from "path";
import { resizeImage } from "../utils";
import imageThumbChecker from "../middlewares/imageThumbChecker";
import { IMAGE_ASSETS_DIR } from "../config";
import { promises as fs } from "fs";

const route = Router();

route.get(
  "/",
  imageThumbChecker,
  async (req: Request, res: Response): Promise<void> => {
    const { filename, height, width } = req.query;
    if (typeof filename === "string" && filename !== "") {
      const imagePath = path.join(
        IMAGE_ASSETS_DIR,
        `${filename as string}.jpg`
      );
      try {
        await fs.access(imagePath);
        const thumbPath = await resizeImage(
          filename as string,
          Number(height),
          Number(width)
        );
        if (thumbPath) res.sendFile(thumbPath);
        else res.send("Image Data Invalid");
      } catch {
        res.send("No Image Found");
      }
    } else {
      res.send("No file name provided");
    }
  }
);

export default route;
