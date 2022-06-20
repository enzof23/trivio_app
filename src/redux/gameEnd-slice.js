import { createSlice } from "@reduxjs/toolkit";

// setEndGame called on "Verify Answers" button click: display text and "Play Again" btn with boolean and result gives score
const endGameSlice = createSlice({
  name: "end-game",
  initialState: {
    isEnded: false,
    result: 0,
  },
  reducers: {
    setEndGame: (state, action) => {
      state.isEnded = action.payload.isEnded;
      state.result = action.payload.result;
    },
  },
});

export default endGameSlice.reducer;
export const { setEndGame } = endGameSlice.actions;
