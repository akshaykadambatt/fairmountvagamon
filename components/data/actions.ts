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
    calculatedPrice: 0,
    addonsData: [] as AddonProps[],
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
    },
    setCalculatedPrice: (state) => {
      window.console.log("calculating price");
      /**
       * How price is calculated;
       * Calculated price = productPrice*adults + productPrice*(children/2) + Σ addonsPrice
       * Σ addonsPrice = allAddons.filter(selectedAddons).reduce(Σ price)
       */
      state.calculatedPrice =
        state.selectedProduct.price * state.selectedNumberOfOccupants[0] +
        state.selectedProduct.price * (state.selectedNumberOfOccupants[1] / 2) +
        state.addonsData
          .filter((addon) => state.selectedAddons.find((id) => id == addon.id) && true)
          .reduce((acc, e) => acc + (e.price || 0), 0);
    },
    setAddonsData: (state, action) => {
      state.addonsData = action.payload;
    },
  },
});

export const {
  setAddonsData,
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
  setCalculatedPrice,
} = actionSlice.actions;

export default actionSlice.reducer;
