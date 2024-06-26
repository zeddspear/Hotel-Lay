import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import { apiSlice } from "../slices/rootApiSlice";

const store = configureStore({
  reducer: {
    userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
