import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

const stripePromise: Promise<Stripe | null> = loadStripe(STRIPE_PUB_KEY);

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? (JSON.parse(localStorage.getItem("userInfo")!) as userInfo)
    : null,
  stripePromise: stripePromise,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<userInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      localStorage.removeItem("userInfo");
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, logout } = userSlice.actions;

export default userSlice.reducer;
