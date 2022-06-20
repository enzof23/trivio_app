import { createSlice } from "@reduxjs/toolkit";

const updatingSlice = createSlice({
  name: "updating",
  initialState: {
    isUpdating: false,
  },
  reducers: {
    toggleUpdating: (state, action) => {
      state.isUpdating = action.payload;
    },
  },
});

export const updatingReducer = updatingSlice.reducer;
export const { toggleUpdating } = updatingSlice.actions;
