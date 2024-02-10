import { apiSlice } from "./rootApiSlice";
import { hotelType } from "../../../backend/src/shared/types.ts";

const HOTEL_URL = "/api/hotels";

const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addHotel: builder.mutation<hotelType, FormData>({
      query: (data) => ({
        url: `${HOTEL_URL}/add-hotel`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    getHotels: builder.query<hotelType[], void>({
      query: () => ({
        url: `${HOTEL_URL}/`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useAddHotelMutation, useGetHotelsQuery } = hotelApiSlice;
