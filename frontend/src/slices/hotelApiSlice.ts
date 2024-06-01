import { apiSlice } from "./rootApiSlice";
import {
  hotelType,
  paymentIntentResponse,
  searchHotelsResponse,
} from "../../../backend/src/shared/types.ts";
import { BookingFormData } from "../components/pages/Booking/BookingForm/BookingForm.tsx";

const HOTEL_URL = "/api/my-hotels";
const SEARCH_URL = "/api/hotels";

export type hotelSearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string;
  maxPrice?: string;
  sortOption?: string;
};

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
    searchHotels: builder.query<searchHotelsResponse, hotelSearchParams>({
      query: (searchParams) => {
        const queryParams = new URLSearchParams();

        queryParams.append("destination", searchParams.destination || "");
        queryParams.append("checkIn", searchParams.checkIn || "");
        queryParams.append("checkOut", searchParams.checkOut || "");
        queryParams.append("adultCount", searchParams.adultCount || "");
        queryParams.append("childCount", searchParams.childCount || "");
        queryParams.append("page", searchParams.page || "");
        searchParams.facilities?.forEach((facility) =>
          queryParams.append("facilities", facility)
        );
        searchParams.types?.forEach((type) =>
          queryParams.append("types", type)
        );
        queryParams.append("stars", searchParams.stars || "");
        queryParams.append("maxPrice", searchParams.maxPrice || "");
        queryParams.append("sortOption", searchParams.sortOption || "");

        return {
          url: `${SEARCH_URL}/search?${queryParams}`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    getHotel: builder.query<hotelType, string>({
      query: (id) => ({
        url: `${SEARCH_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Hotel"],
    }),
    paymentIntent: builder.mutation<
      paymentIntentResponse,
      { id: string; numberOfNights: string }
    >({
      query: (data) => ({
        url: `${SEARCH_URL}/${data.id}/booking/payment-intent`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    makeBooking: builder.mutation<any, BookingFormData>({
      query: (data) => ({
        url: `${SEARCH_URL}/${data.hotelId}/booking`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    lastAddedHotels: builder.query<hotelType[], void>({
      query: () => ({
        url: `${SEARCH_URL}/latest-hotels`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useAddHotelMutation,
  useGetHotelsQuery,
  useGetSingleHotelQuery,
  useUpdateHotelMutation,
  useSearchHotelsQuery,
  useGetHotelQuery,
  usePaymentIntentMutation,
  useMakeBookingMutation,
  useLastAddedHotelsQuery,
} = hotelApiSlice;
