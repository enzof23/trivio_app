import "../styles/Navbar.scss";
import { RiQuestionnaireFill } from "react-icons/ri";
import { useSelector } from "react-redux";

function Navbar() {
  const { name, color } = useSelector((state) => state.gameStart.categoryInfo);

  return (
    <nav className="navbar__container" style={{ backgroundColor: color }}>
      <div className="logo__container app__flex">
        <RiQuestionnaireFill />
        <a href="/">Triv.io</a>
      </div>
      {name && <div className="category__title">{name}</div>}
      <div></div>
    </nav>
  );
}

export default Navbar;
