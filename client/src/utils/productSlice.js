import { createSlice } from "@reduxjs/toolkit";

const storedData = JSON.parse(localStorage.getItem("cart-craze"));

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    cart: storedData || [],
  },
  reducers: {
    addProduct: (state, action) => {
      const { id, name, price, image, description, quantity } = action.payload;
      const existingProduct = state.cart.find((product) => product.id === id);
      alert(`Added ${name} to cart`)

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
    },
    updateCartFromLocalStorage: (state, action) => {
      state.cart = action.payload || [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.filter((item) => item.id !== itemId);
    },
  },
});

export const { addProduct, updateCartFromLocalStorage, removeItem } = productSlice.actions;
export default productSlice.reducer;
