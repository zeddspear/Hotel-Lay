import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Hotel from "../models/hotelModel";
import {
  bookingType,
  hotelType,
  paymentIntentResponse,
  searchHotelsResponse,
} from "../shared/types";
import { param, validationResult } from "express-validator";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

export const getHotel = [
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  expressAsyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id.toString();

    try {
      const hotel = await Hotel.findById(id);
      if (!hotel) {
        res
          .status(400)
          .json({ message: "Hotel not found in database with this ID" });
      }
      res.status(200).json(hotel);
    } catch (error) {
      console.log("Error occured while fetching Hotel: " + error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }),
];

export const getHotels = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const query = constructSearchQuery(req.query);

      let sortOptions = {};
      switch (req.query.sortOption) {
        case "starRating":
          sortOptions = { starRating: -1 };
          break;
        case "pricePerNightAsc":
          sortOptions = { pricePerNight: 1 };
          break;
        case "pricePerNightDesc":
          sortOptions = { pricePerNight: -1 };
          break;
      }

      // Total hotels to show on a single page
      const pageSize = 5;

      // Current page number
      const currentPage = Number(
        req.query.page ? req.query.page.toString() : "1"
      );
      // Hotels to skip according to page number
      const skip = (currentPage - 1) * pageSize;

      const hotels = await Hotel.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(5);

      const totalNumbersOfHotels = await Hotel.find(query)
        .sort(sortOptions)
        .countDocuments();

      const response: searchHotelsResponse = {
        hotels: hotels,
        pagination: {
          total: totalNumbersOfHotels,
          page: currentPage,
          pages: Math.ceil(totalNumbersOfHotels / pageSize),
        },
      };

      res.status(200).json(response);
    } catch (error) {
      console.log("Error occured while fetching Hotels: " + error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export const paymentIntent = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { numberOfNights } = req.body;

    const hotelID = req.params.id;

    const hotel = await Hotel.findById(hotelID);

    if (!hotel) {
      res.status(400).json({ message: "Hotel not found" });
    }

    // Converting price per night into usd
    const pricePerNightInUsdApprox: number =
      Number(hotel?.pricePerNight) * 0.0036;

    const totalCost = Math.floor(
      Number(pricePerNightInUsdApprox) * Number(numberOfNights)
    );

    console.log("totalCost: ", totalCost);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        hotelID,
      },
    });

    if (!paymentIntent.client_secret) {
      res.status(500).json({ message: "Error while creating payment intent" });
    }

    const response: paymentIntentResponse = {
      paymentIntentID: paymentIntent.id,
      clientSecret: paymentIntent.client_secret?.toString()!,
      totalCost: Math.floor(totalCost * 277),
    };

    res.status(200).send(response);
  }
);

export const makeBooking = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const paymentIntentID = req.body.paymentIntentId;
      const hotelID = req.params.id;
      const userID = req.user._id;

      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentID as string
      );

      if (!paymentIntent) {
        res.status(400).json({ message: "Payment intent not found" });
      }

      if (paymentIntent.metadata.hotelID !== hotelID) {
        res.status(400).json({ message: "Payment intent mismatch" });
      }

      if (paymentIntent.status !== "succeeded") {
        res.status(400).json({
          message: `Payment intent not succeeded. Status:${paymentIntent.status}`,
        });
      }

      const newBooking: bookingType = {
        ...req.body,
        userId: userID,
      };

      const hotel = await Hotel.findByIdAndUpdate(
        { _id: hotelID },
        {
          $push: { bookings: newBooking },
        }
      );

      if (!hotel) {
        res.status(400).json({ message: "Hotel not found" });
      }

      await hotel?.save();

      res.status(200).json({ message: "Hotel booking done" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export const getBookedHotelsOfUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;

    console.log("UserId: ", userId);

    try {
      const hotels = await Hotel.aggregate([
        {
          $unwind: "$bookings",
        },
        {
          $match: { "bookings.userId": userId.toString() },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            city: { $first: "$city" },
            country: { $first: "$country" },
            imgsURLs: { $first: "$imgsURLs" },
            bookings: { $push: "$bookings" },
          },
        },
      ]);

      if (hotels.length > 0) {
        res.status(200).json(hotels);
      }
      res.status(400).json({ message: "No bookings found" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export const lastAddedHotels = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const hotels = await Hotel.find().sort({ createdAt: -1 }).limit(10);
      res.status(200).json(hotels);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = parseInt(queryParams.stars.toString());

    constructedQuery.starRating = { $lte: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice.toString()),
    };
  }

  return constructedQuery;
};
