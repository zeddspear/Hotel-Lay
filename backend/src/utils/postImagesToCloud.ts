import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

export const postImgsToCloudinary = function (
  imagesFiles: Express.Multer.File[]
): Promise<UploadApiResponse>[] {
  const urlsPromises = imagesFiles.map(async (img) => {
    const b64 = Buffer.from(img.buffer).toString("base64");
    let dataURI = `data:${img.mimetype};base64,${b64}`;
    const res = await cloudinary.uploader.upload(dataURI);
    return res;
  });

  return urlsPromises;
};
