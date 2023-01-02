import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, updateDoc, writeBatch } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const actionSlice = createSlice({
  name: "actions",
  initialState: {
    userId: "" as string,
    notification: { title: "", body: "" } as { title: string; body: string },
    selectedProduct: {} as ProductProps,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setNotification: (state, action) => {
      state.notification.title = action.payload.title;
      state.notification.body = action.payload.body;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setUserId, setNotification, setSelectedProduct } = actionSlice.actions;

export default actionSlice.reducer;
