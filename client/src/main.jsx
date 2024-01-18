import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./layouts/Home.jsx";
import About from "./layouts/About.jsx";
import Cart from "./layouts/Cart.jsx";
import Login from "./layouts/Login.jsx";
import Signup from "./layouts/Signup.jsx";
import Error from "./layouts/Error.jsx";
import Order from "./layouts/Order.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Product from "./layouts/Product.jsx";
import Category from "./layouts/Category.jsx";
import { Provider } from "react-redux";
import store from "./utils/store.js";

const clientId = import.meta.env.REACT_APP_GOOGLE_CLIENT_ID;
console.log(clientId);

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
        path: "/orders",
        element: <Order />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/product/:productId",
        element: <Product />,
      },
      {
        path: "/category/:categoryId",
        element: <Category />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
