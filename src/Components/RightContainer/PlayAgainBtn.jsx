import { useSelector, useDispatch } from "react-redux";
import { setEndGame } from "../../redux/gameEnd-slice";
import { getQuestions } from "../../redux/fetchQuestions-slice";

function PlayAgainBtn() {
  const { color } = useSelector((state) => state.gameStart.categoryInfo);

  const { category, settings } = useSelector((state) => state.gameSettings);
  const { amount, difficulty } = settings;

  const question = useSelector((state) => state.questions);
  const result = useSelector((state) => state.end.result);
  const dispatch = useDispatch();

  const playAgain = () => {
    const settings = { category, amount, difficulty };
    dispatch(getQuestions(settings));
    window.scrollTo(0, 0);
    dispatch(setEndGame({ isEnded: false, result: 0 }));
  };

  return (
    <div className="result__container app__flex">
      <div className="result__text">
        You scored {`${result}/${question.length}`} good answers
      </div>
      <button onClick={playAgain} style={{ backgroundColor: color }}>
        Play Again
      </button>
    </div>
  );
}

export default PlayAgainBtn;
