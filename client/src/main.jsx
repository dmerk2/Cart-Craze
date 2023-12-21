import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./layouts/Home.jsx";
import About from "./layouts/About.jsx";
import Cart from "./layouts/Cart.jsx";
import Contact from "./layouts/Contact.jsx";
import Login from "./layouts/Login.jsx";
import Signup from "./layouts/Signup.jsx";
import Error from "./layouts/Error.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

// const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
// console.log(clientId);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
