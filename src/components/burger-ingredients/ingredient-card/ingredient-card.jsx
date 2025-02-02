import styles from "./ingredient-card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeValue } from "../../../services/modal-window-slice";
import { addDetails } from "../../../services/ingredient-details-slice";
import { useDrag } from "react-dnd";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../../utils/types";
import { Link, useLocation } from "react-router";

export default function IngredientCard({ ingredient }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedIngredients = useSelector((state) => state.burgerConstructor);

  const openIngredientModalWindow = () => {
    dispatch(changeValue("ingredient"));
    dispatch(addDetails(ingredient));
  };

  const count =
    ingredient.type === "bun"
      ? selectedIngredients.bun?._id === ingredient._id
        ? 2
        : 0
      : selectedIngredients.ingredients.filter(
          (el) => el._id === ingredient._id
        ).length;

  const [, dragRef] = useDrag({
    type: ingredient.type === "bun" ? "bun" : "filing",
    item: ingredient,
  });
  return (
    <Link
      to={`/ingredients/${ingredient._id}`}
      state={{ previousLocation: location }}
      className={styles.link}
    >
      <div
        className={styles.container}
        onClick={() => openIngredientModalWindow()}
        ref={dragRef}
        draggable
      >
        {count > 0 ? (
          <Counter count={count} size="default" extraClass="m-1" />
        ) : null}

        <img
          className={styles.ingredientImage}
          src={ingredient.image}
          alt={ingredient.name}
        ></img>
        <div className={styles.priceContainer + " mt-1 mb-1"}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={styles.ingredientName + " text text_type_main-default"}>
          {ingredient.name}
        </h3>
      </div>
    </Link>
  );
}

IngredientCard.propTypes = {
  ingredient: ingredientType,
};
