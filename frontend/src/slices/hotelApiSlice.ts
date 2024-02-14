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
      providesTags: ["Hotel"],
    }),
    getSingleHotel: builder.query<hotelType, string>({
      query: (id) => ({
        url: `${HOTEL_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Hotel"],
    }),
    updateHotel: builder.mutation<string, FormData>({
      query: (data) => ({
        url: `${HOTEL_URL}/${data.get("id")}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Hotel"],
    }),
  }),
});

export const {
  useAddHotelMutation,
  useGetHotelsQuery,
  useGetSingleHotelQuery,
  useUpdateHotelMutation,
} = hotelApiSlice;
