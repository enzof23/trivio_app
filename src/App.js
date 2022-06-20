import { Navbar } from "./Components/index";
import { LeftContainer, RightContainer } from "./containers/index";

function App() {
  return (
    <>
      <Navbar />
      <div className="body__container">
        <LeftContainer />
        <RightContainer />
      </div>
    </>
  );
}

export default App;
