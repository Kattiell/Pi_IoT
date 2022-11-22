import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./pages/Login/index";
import SignUp from "./pages/SignUp/index";
import Suporte from "./pages/Suporte/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastre-se",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
