import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import AppLayout from "./applayout";
import "./index.css";
import BookingPage from "./pages/booking";
import HomePage from "./pages/home.jsx";
import MoviePage from "./pages/movie";
import SignUpPage from "./pages/signup";

const router = createBrowserRouter([
  {
    path: "",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/movie/:movieId",
        element: <MoviePage />,
      },
      {
        path: "/tickets/:movieId",
        element: <BookingPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
