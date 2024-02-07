import { apiSlice } from "./rootApiSlice";

const HOTEL_URL = "/api/hotels";

const hotelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addHotel: builder.mutation({
      query: (data) => ({
        url: `${HOTEL_URL}/add-hotel`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});

export const { useAddHotelMutation } = hotelApiSlice;
