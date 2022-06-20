import { Categories, Settings } from "../Components/index";
import { useSelector } from "react-redux";
import "../styles/LeftContainer.scss";

function LeftContainer() {
  const { gameStarted } = useSelector((state) => state.gameStart);

  const categoriesContainer = (
    <div className="left__container">
      <Categories />
    </div>
  );

  const settingsContainer = <Settings />;

  return gameStarted ? settingsContainer : categoriesContainer;
}

export default LeftContainer;
