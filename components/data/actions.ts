import { createSlice } from "@reduxjs/toolkit";

export const actionSlice = createSlice({
  name: "actions",
  initialState: {
    userId: "" as string,
    notification: { title: "", body: "" } as { title: string; body: string },
    selectedProduct: {} as ProductPropsWithValue,
    selectedDate: [null, null] as [Date | null, Date | null],
    selectedNumberOfOccupants: [0, 0], //[adults, children]
    selectedAddons: [] as string[],
    selectedNotes: "",
    selectedTerms: false,
    selectedEmail: "",
    selectedPhone: "",
    selectedName: "",
    selectedId: "",
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
    setSelectedName: (state, action) => {
      state.selectedName = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
      // state.selectedDate= [null,null]
      // state.selectedAddons = []
      // state.selectedId = ""
      // state.selectedNotes = ""
      // state.selectedNumberOfOccupants = []
    },
  },
});

export const {
  setSelectedId,
  setSelectedName,
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
