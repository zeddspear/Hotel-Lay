import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Hotel from "../models/hotelModel";
import { searchHotelsResponse } from "../shared/types";

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
      console.log("Error occured while updated Hotel: " + error);
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
