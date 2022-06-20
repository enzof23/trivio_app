import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuestions = createAsyncThunk(
  "question/getQuestions",
  async (settings) => {
    const { category, amount, difficulty } = settings;
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    return axios.get(url).then((res) => res.data);
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState: {
    list: [],
    status: null,
  },
  reducers: {
    reinitializeGame: (state) => {
      state.list = [];
      state.status = null;
    },
  },
  extraReducers: {
    [getQuestions.pending]: (state) => {
      state.status = "loading";
    },
    [getQuestions.fulfilled]: (state, action) => {
      state.status = "success";
      state.list = action.payload;
    },
    [getQuestions.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default questionSlice.reducer;
export const { reinitializeGame } = questionSlice.actions;
