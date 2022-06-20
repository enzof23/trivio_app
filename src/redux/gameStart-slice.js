import { createSlice } from "@reduxjs/toolkit";

// gameStarted state to toggle display
// name is used to display category name in Navbar
// color is to change the theme color based on category selected
const gameStartSlice = createSlice({
  name: "gameStart",
  initialState: {
    gameStarted: false,
    categoryInfo: {
      name: "",
      color: "#afdafb",
    },
  },
  reducers: {
    startGame: (state, action) => {
      state.gameStarted = action.payload.start;
      state.categoryInfo.name = action.payload.name;
      state.categoryInfo.color = action.payload.color;
    },
  },
});

export const gameStartReducer = gameStartSlice.reducer;
export const { startGame } = gameStartSlice.actions;

// game settings used to fetch questions from API
const gameSettingsSlice = createSlice({
  name: "gameSettings",
  initialState: {
    category: 0,
    settings: {
      amount: 10,
      difficulty: "",
    },
  },
  reducers: {
    updateCategory: (state, action) => {
      return {
        ...state,
        category: action.payload.category,
      };
    },
    updateSettings: (state, action) => {
      return {
        ...state,
        settings: {
          amount: action.payload.amount,
          difficulty:
            action.payload.difficulty === "mixed"
              ? ""
              : action.payload.difficulty,
        },
      };
    },
  },
});

export const gameSettingsReducer = gameSettingsSlice.reducer;
export const { updateCategory, updateSettings } = gameSettingsSlice.actions;
