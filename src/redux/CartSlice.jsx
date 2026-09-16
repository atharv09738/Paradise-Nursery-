import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

// Helper function to update totals
const calculateTotals = (state) => {
  state.totalItems = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  state.totalAmount = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // Add item to cart
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      calculateTotals(state);
    },

    // Remove item completely
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      calculateTotals(state);
    },

    // Increase or decrease quantity
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === id
      );

      if (existingItem) {
        if (quantity > 0) {
          existingItem.quantity = quantity;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== id
          );
        }
      }

      calculateTotals(state);
    },

    // Clear cart after checkout
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 
