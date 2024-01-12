import { createSlice } from "@reduxjs/toolkit";
const storedData = JSON.parse(localStorage.getItem("cart-craze"))

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    cart: storedData || [],
  },
  reducers: {
    addProduct: (state, action) => {
      const { id, name, price, image, description, quantity } = action.payload;
      const existingProductIndex = state.cart.findIndex(
        (product) => product.id === id
      );

      if (existingProductIndex !== -1) {
        // If the product exists, update the quantity
        state.cart[existingProductIndex].quantity += quantity || 1;
      } else {
        // If the product doesn't exist, add it to the cart
        state.cart.push({
          id,
          name,
          price,
          image,
          description,
          quantity: quantity || 1,
        });
      }
    },
    updateCartFromLocalStorage: (state, action) => {
      if (action.payload) {
        state.cart = action.payload;
      }
    },
  },
});

export const { addProduct, updateCartFromLocalStorage } = productSlice.actions;
export default productSlice.reducer;
