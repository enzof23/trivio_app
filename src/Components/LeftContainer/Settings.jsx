import "../../styles/Settings.scss";
import { icons } from "../../assets/icon";

import { useDispatch, useSelector } from "react-redux";
import { toggleUpdating } from "../../redux/isUpdating-slice";
import { startGame, updateSettings } from "../../redux/gameStart-slice";
import {
  getQuestions,
  reinitializeGame,
} from "../../redux/fetchQuestions-slice";

import {
  questionAmount,
  questionDifficulty,
} from "../../utils/data_objects/settingsData";
import { useState } from "react";
import { setEndGame } from "../../redux/gameEnd-slice";

function Settings() {
  const [amountState, setAmountState] = useState(questionAmount);
  const [difficultyState, setDifficultyState] = useState(questionDifficulty);

  const { category } = useSelector((state) => state.gameSettings);
  const { isUpdating } = useSelector((state) => state.updating);
  const { color } = useSelector((state) => state.gameStart.categoryInfo);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (!isUpdating) {
      dispatch(toggleUpdating(true));
    }

    const amountSelected = amountState.map((item) => {
      if (item.amount === e) {
        return { amount: item.amount, type: "active" };
      }
      return { amount: item.amount, type: "inactive" };
    });

    const difficultySelected = difficultyState.map((item) => {
      if (item.diff === e) {
        return { diff: item.diff, type: "active" };
      }
      return { diff: item.diff, type: "inactive" };
    });

    typeof e === "number"
      ? setAmountState(amountSelected)
      : setDifficultyState(
          difficultySelected === "mixed" ? "" : difficultySelected
        );
  };

  const handleUpdate = () => {
    dispatch(setEndGame({ isEnded: false, result: 0 }));
    const newAmount = amountState.find((item) => item.type === "active").amount;
    const newDifficulty = difficultyState.find(
      (item) => item.type === "active"
    ).diff;

    dispatch(updateSettings({ amount: newAmount, difficulty: newDifficulty }));

    const amount = newAmount;
    const difficulty = newDifficulty === "mixed" ? "" : newDifficulty;

    const settings = { category, amount, difficulty };
    dispatch(getQuestions(settings));

    dispatch(toggleUpdating(false));
  };

  const goBack = () => {
    dispatch(toggleUpdating(false));
    dispatch(startGame({ start: false, catName: "", color: "#afdafb" }));
    dispatch(updateSettings({ category: 0, amount: 10, difficulty: "" }));
    dispatch(setEndGame({ isEnded: false, result: 0 }));
    dispatch(reinitializeGame());
  };

  return (
    <div className="settings__container app__flex">
      <div className="settings__title">
        <div className="settings__back" onClick={goBack}>
          {icons.go_back} Back
        </div>
        <div className="title__header">Settings</div>
      </div>
      <div className="set__container">
        <div>
          <h3>Number of questions</h3>
          <div className="box__container">
            {amountState.map((item) => {
              const { amount, type } = item;
              return (
                <div
                  className="set__box"
                  key={amount}
                  style={{
                    backgroundColor: type === "active" ? color : "",
                    color: type === "active" ? "white" : "",
                  }}
                  onClick={() => handleClick(amount)}
                >
                  {amount}
                </div>
              );
            })}
          </div>
        </div>
        <hr className="settings__line"></hr>
        <div>
          <h3>Choose the difficulty</h3>
          <div className="box__container">
            {difficultyState.map((item) => {
              const { diff, type } = item;
              return (
                <div
                  className="set__box"
                  key={diff}
                  style={{
                    backgroundColor: type === "active" ? color : "",
                    color: type === "active" ? "white" : "",
                  }}
                  onClick={() => handleClick(diff)}
                >
                  {diff}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {isUpdating && (
        <button style={{ backgroundColor: color }} onClick={handleUpdate}>
          Update
        </button>
      )}
    </div>
  );
}

export default Settings;
