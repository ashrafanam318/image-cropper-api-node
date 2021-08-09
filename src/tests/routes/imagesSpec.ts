import app from "../../index";
import supertest from "supertest";
import { promises as fs } from "fs";
import path from "path";
import { resizeImage } from "../../utils";
import { THUMBNAIL_ASSETS_DIR } from "../../config";
import sharp from "sharp";

const request = supertest(app);

const getThumbnailPath = (filename: string): string =>
  path.join(THUMBNAIL_ASSETS_DIR, filename + ".jpg");

describe("Testing images route", () => {
  it("returns the image file when called with the image name and dimensions", async (done) => {
    const filename = "fjord";
    const response = await request.get(
      `/image?filename=${filename}&height=300&width=400`
    );
    const imageThumb = await fs.readFile(getThumbnailPath(filename));
    // console.log(response);
    expect(response.body).toEqual(imageThumb);
    done();
  });

  it("retuns 404 error when called without an image name", async (done) => {
    const response = await request.get(`/image`);
    // console.log(response);
    expect(response.statusCode).toEqual(404);
    done();
  });
});

describe("testing the image resizer", () => {
  it("resizes image based on the dimensions provided", () => {
    const filename = "icelandwaterfall";
    return resizeImage(filename, 300, 200)
      .then((thumbPath) => sharp(thumbPath as unknown as string).metadata())
      .then((thumbMetadata) => {
        expect([thumbMetadata.height, thumbMetadata.width]).toEqual([300, 200]);
      });
  });
});
