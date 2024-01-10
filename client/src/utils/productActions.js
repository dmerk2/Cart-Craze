import { createAction } from "@reduxjs/toolkit";

export const updateCart = createAction("UPDATE_CART", (cartData) => {
  console.log("Updating cart with data:", cartData);
  return { payload: cartData };
});
