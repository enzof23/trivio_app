import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "questions",
  initialState: [],
  reducers: {
    updateQuestions: (state, action) => {
      return (state = action.payload);
    },
    holdAnswers: (state, action) => {
      return (state = action.payload);
    },
  },
});

export default questionsSlice.reducer;
export const { updateQuestions, holdAnswers } = questionsSlice.actions;
