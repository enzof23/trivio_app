import { useDispatch, useSelector } from "react-redux";

import { Questions, VerifyButton, PlayAgainBtn } from "../index";
import "../../styles/Quiz.scss";

import { createQuestions } from "../../utils/createQuestion";
import { updateQuestions } from "../../redux/questions-slice";

import { getQuestions } from "../../redux/fetchQuestions-slice";
import { FlowerSpinner } from "react-epic-spinners";

function Quiz() {
  const dispatch = useDispatch();
  const { color } = useSelector((state) => state.gameStart.categoryInfo);
  const { list, status } = useSelector((state) => state.getQuestion);
  const { category, settings } = useSelector((state) => state.gameSettings);
  const { amount, difficulty } = settings;
  const gameSettings = { category, amount, difficulty };
  const gameEnded = useSelector((state) => state.end.isEnded);

  if (!status) {
    dispatch(getQuestions(gameSettings));
  }

  if (status === "loading") {
    return <FlowerSpinner color={color} />;
  }

  if (status === "failed") {
    return (
      <>
        <h1> An error has occured </h1>
        <button
          onClick={() => dispatch(getQuestions(gameSettings))}
          style={{ backgroundColor: color }}
        >
          Try Again
        </button>
      </>
    );
  }

  if (status === "success") {
    const data = createQuestions(list.results);
    dispatch(updateQuestions(data));

    if (data.length === 0) {
      return <>Not enough questions found, try other settings</>;
    }
  }

  return (
    <>
      <Questions />
      {gameEnded ? <PlayAgainBtn /> : <VerifyButton />}
    </>
  );
}

export default Quiz;
