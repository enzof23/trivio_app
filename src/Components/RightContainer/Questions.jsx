import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { holdAnswers } from "../../redux/questions-slice";

function Questions() {
  const initialQuestions = useSelector((state) => state.questions);
  const { color } = useSelector((state) => state.gameStart.categoryInfo);
  const endGame = useSelector((state) => state.end.isEnded);
  const dispatch = useDispatch();

  const [questions, setQuestions] = useState(initialQuestions);

  const holdAnswer = (e, index) => {
    const newQuestions = questions.map((q, i) => {
      if (i === index) {
        const { allAnswers } = q;
        const newAnswers = allAnswers.map((answer) => {
          if (answer.value === e.value) {
            return { ...answer, isHeld: true };
          } else {
            return { ...answer, isHeld: false };
          }
        });
        return { ...q, allAnswers: newAnswers };
      } else return q;
    });

    setQuestions(newQuestions);
    dispatch(holdAnswers(newQuestions));
  };

  const questionDisplay = questions.map((q, index) => {
    const { question, allAnswers } = q;
    return (
      <div className="question__box" key={`container ${index}`}>
        <div className="question__line app__flex" key={{ index }}>
          <div className="question__header" key={`question ${index}`}>
            {question}
          </div>
          <div className="question__answers" key={`answers ${index}`}>
            {allAnswers.map((answer, i) => {
              const { isHeld, isCorrect } = answer;

              const gameStyle = {
                backgroundColor: isHeld ? color : "",
                color: isHeld ? "white" : "black",
                border: isHeld
                  ? `0.75px solid ${color}`
                  : "0.75px solid #4d5b9e",
              };

              const endGameStyle =
                isHeld && isCorrect
                  ? {
                      backgroundColor: "#43d963",
                      fontWeight: 500,
                      color: "white",
                      border: "none",
                    }
                  : isHeld && !isCorrect
                  ? {
                      backgroundColor: "#f74949",
                      color: "white",
                      border: "none",
                    }
                  : !isHeld && isCorrect
                  ? {
                      backgroundColor: "#94d7a2",
                      fontWeight: 500,
                      color: "white",
                      border: "none",
                    }
                  : {
                      backgroundColor: "",
                      color: "#293264a8",
                      border: "0.75px solid #2932646e",
                    };

              return (
                <div
                  className="answer__container app__flex"
                  style={endGame ? endGameStyle : gameStyle}
                  onClick={() => holdAnswer(answer, index)}
                  key={`${answer.value} ${i}`}
                >
                  {answer.value}
                </div>
              );
            })}
          </div>
        </div>
        <hr className="h-line" key={`line ${index}`}></hr>
      </div>
    );
  });

  return <div className="question__container app__flex">{questionDisplay}</div>;
}

export default Questions;
