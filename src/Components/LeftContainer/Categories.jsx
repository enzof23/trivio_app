import "../../styles/Categories.scss";
import { useDispatch } from "react-redux";

import categories from "../../utils/data_objects/categoryData";
import { startGame, updateCategory } from "../../redux/gameStart-slice";

function Categories() {
  const dispatch = useDispatch();

  // When selecting a category, gameStarted state is toggled and <Quiz /> is displayed
  const handleClick = (id, color, name) => {
    dispatch(startGame({ start: true, color, name }));
    dispatch(updateCategory({ category: id }));
  };

  return (
    <div className="categories__container app__flex">
      <h1>Select a category</h1>
      {categories.map((item) => {
        const { name, id, image, color } = item;
        return (
          <div
            key={id}
            className="category__div app__flex"
            id={id}
            onClick={() => handleClick(id, color, name)}
          >
            <div className="icon__container" style={{ backgroundColor: color }}>
              {image}
            </div>
            <p>{name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Categories;
