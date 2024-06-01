import { hotelType } from "../../../backend/src/shared/types";
import { apiSlice } from "./rootApiSlice";

const USER_URL = "/api/users";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<userInfo, registerTypes>({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation<userInfo, any>({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logoutUser: builder.mutation<{ message: string }, null>({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    getBookingsOfUser: builder.query<hotelType[], void>({
      query: () => ({
        url: `${USER_URL}/booked-hotels`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetBookingsOfUserQuery,
} = userApiSlice;
