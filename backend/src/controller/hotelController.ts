import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import multer from "multer";
import { postImgsToCloudinary } from "../utils/postImagesToCloud";
import { UploadApiResponse } from "cloudinary";
import Hotel, { hotelType } from "../models/hotelModel";
import { body, validationResult } from "express-validator";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5 mb per image
  },
});

export const postHotel = [
  upload.array("imageFiles", 6),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("childCount"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
    body("adultCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Adult count is required and must be a number"),
    body("childCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Child count is required and must be a number"),
    body("starRating")
      .notEmpty()
      .isNumeric()
      .withMessage(
        "Star rating is required and must be between the range of 1 to 5"
      ),
  ],
  expressAsyncHandler(async (req: Request, res: Response) => {
    const hotel = await Hotel.findOne({
      name: req.body.name,
      userId: req.user._id,
    });
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    if (hotel) {
      res
        .status(400)
        .json({ message: "This user already have a hotel  with this name" });
      throw new Error("Hotel already exists with this name!");
    } else {
      try {
        const imagesFiles = req.files as Express.Multer.File[];
        const newHotel: hotelType = req.body;

        // Upload images to the cloudinary
        const imgsPromises: Promise<UploadApiResponse>[] =
          postImgsToCloudinary(imagesFiles);

        const uploadImgsRes: UploadApiResponse[] = await Promise.all(
          imgsPromises
        );

        // extracting images url from response array object
        const imgURLs: string[] = uploadImgsRes.map((img) => img.secure_url);

        // if uploading images goes successful Add images to the Hotel object
        newHotel.imgsURLs = imgURLs;
        newHotel.userId = req.user._id;
        newHotel.lastUpdated = new Date();

        // Post a hotel to db
        const hotelCreated = await Hotel.create(newHotel);

        res.status(201).send(hotelCreated);
      } catch (error) {
        console.log(`Error happend while posting images ${error}`);
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  }),
];
