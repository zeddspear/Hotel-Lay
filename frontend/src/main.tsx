import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.scss";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Register from "./components/pages/Register";
import SignIn from "./components/pages/SignIn/SignIn.tsx";
import Home from "./components/pages/Home/Home.tsx";
import SearchPage from "./components/pages/SearchPage/SearchPage.tsx";
import store from "./store/store.ts";
import { Provider } from "react-redux";
import AddHotel from "./components/pages/AddHotel/AddHotel.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<SignIn />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/add-hotel" element={<AddHotel />} />
      </Route>
      <Route path="*" element={<Navigate to={"/"} />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={mainRouter} />
    </Provider>
  </React.StrictMode>
);
