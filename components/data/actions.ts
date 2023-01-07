import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, updateDoc, writeBatch } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const actionSlice = createSlice({
  name: "actions",
  initialState: {
    userId: "" as string,
    notification: { title: "", body: "" } as { title: string; body: string },
    selectedProduct: {} as ProductPropsWithValue,
    selectedDate: [null, null] as [Date | null, Date | null],
    selectedNumberOfOccupants: [0, 0], //[adults, children]
    selectedAddons: [] as number[],
    selectedNotes: "",
    selectedTerms: false,
    selectedEmail: "",
    selectedPhone: "",
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
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedNumberOfOccupants: (state, action) => {
      state.selectedNumberOfOccupants = action.payload;
    },
    setSelectedAddons: (state, action) => {
      state.selectedAddons = action.payload;
    },
    setSelectedNotes: (state, action) => {
      state.selectedNotes = action.payload;
    },
    setSelectedTerms: (state, action) => {
      state.selectedTerms = action.payload;
    },
    setSelectedPhone: (state, action) => {
      state.selectedPhone = action.payload;
    },
    setSelectedEmail: (state, action) => {
      state.selectedEmail = action.payload;
    },
  },
});

export const {
  setSelectedEmail,
  setSelectedPhone,
  setSelectedTerms,
  setSelectedNotes,
  setSelectedAddons,
  setUserId,
  setNotification,
  setSelectedProduct,
  setSelectedDate,
  setSelectedNumberOfOccupants,
} = actionSlice.actions;

export default actionSlice.reducer;
