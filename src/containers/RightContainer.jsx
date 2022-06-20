import { ErrorBoundary } from "react-error-boundary";
import { Quiz } from "../Components/index";
import { ErrorFallback } from "../utils/ErrorFallback";
import { useSelector } from "react-redux";

import "../styles/RightContainer.scss";

function RightContainer() {
  const { gameStarted } = useSelector((state) => state.gameStart);

  if (gameStarted) {
    return (
      <div className="right__container app__flex">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Quiz />
        </ErrorBoundary>
      </div>
    );
  }

  return (
    <div className="right__container app__flex hide__phone">
      Select a category to start a game
    </div>
  );
}

export default RightContainer;
