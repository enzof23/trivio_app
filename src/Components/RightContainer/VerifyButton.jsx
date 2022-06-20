import { useSelector, useDispatch } from "react-redux";
import { setEndGame } from "../../redux/gameEnd-slice";

function VerifyButton() {
  const dispatch = useDispatch();
  const question = useSelector((state) => state.questions);
  const { color } = useSelector((state) => state.gameStart.categoryInfo);

  const verifyAnswers = () => {
    const answersSelected = question.map((question) => {
      const { allAnswers } = question;
      return allAnswers.find((answer) => answer.isHeld === true);
    });
    const result = answersSelected.filter((answer) => {
      if (answer) {
        return answer.isCorrect === true;
      }
      return null;
    }).length;
    dispatch(setEndGame({ isEnded: true, result: result }));
  };

  return (
    <button
      onClick={verifyAnswers}
      style={{ backgroundColor: color, alignSelf: "center" }}
    >
      Verify Answers
    </button>
  );
}

export default VerifyButton;
