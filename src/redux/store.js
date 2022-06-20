import { configureStore } from "@reduxjs/toolkit";

import { gameStartReducer, gameSettingsReducer } from "./gameStart-slice";
import questionsReducer from "./questions-slice";
import { updatingReducer } from "./isUpdating-slice";
import endGameReducer from "./gameEnd-slice";

import fetchQuestionReducer from "./fetchQuestions-slice";

export default configureStore({
  reducer: {
    gameStart: gameStartReducer,
    gameSettings: gameSettingsReducer,
    updating: updatingReducer,
    questions: questionsReducer,
    end: endGameReducer,
    getQuestion: fetchQuestionReducer,
  },
});
