import express, { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Hotel from "../models/hotelModel";
import { hotelType, searchHotelsResponse } from "../shared/types";

export const getHotels = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      // Total hotels to show on a single page
      const pageSize = 5;

      console.log(req.query);

      // Current page number
      const currentPage = Number(
        req.query.page ? req.query.page.toString() : "1"
      );
      // Hotels to skip according to page number
      const skip = (currentPage - 1) * pageSize;

      const hotels = await Hotel.find().skip(skip).limit(5);

      const totalNumbersOfHotels = await Hotel.countDocuments();

      const response: searchHotelsResponse = {
        hotels: hotels,
        pagination: {
          total: totalNumbersOfHotels,
          page: currentPage,
          pages: totalNumbersOfHotels / pageSize,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      console.log("Error occured while updated Hotel: " + error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
