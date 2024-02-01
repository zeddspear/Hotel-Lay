import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? (JSON.parse(localStorage.getItem("userInfo")!) as userInfo)
    : null,
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
