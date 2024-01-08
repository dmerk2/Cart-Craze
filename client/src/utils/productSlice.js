import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    cart: [],
  },
  reducers: {
    addProduct: (state, action) => {
      console.log("Current State before adding product:", state);

      const { id, name, price, image, description, quantity } = action.payload;
      const existingProduct = state.cart.find((product) => product.id === id);

      if (existingProduct) {
        existingProduct.quantity += quantity || 1;
      } else {
        state.cart.push({
          id,
          name,
          price,
          image,
          description,
          quantity: quantity || 1,
        });
      }

      console.log("Current State after adding product:", state, action);
    },
  },
});

export const { addProduct } = productSlice.actions;

export default productSlice.reducer;
