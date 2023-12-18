import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./layouts/Home.jsx";
import About from "./layouts/About.jsx";
import Cart from "./layouts/Cart.jsx";
import Contact from "./layouts/Contact.jsx";
import Error from "./layouts/Error.jsx";

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
        element: <Home /> 
      },
      { 
        path: "/about", 
        element: <About /> 
      },
      { 
        path: "/cart", 
        element: <Cart /> 
      },
      { 
        path: "/contact", 
        element: <Contact /> 
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
