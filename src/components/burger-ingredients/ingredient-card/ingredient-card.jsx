import styles from "./ingredient-card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ADD_DETAILS } from "../../../services/actions/ingredient-details";
import { OPEN_MODAL_WINDOW } from "../../../services/actions/modal-window";
import { useDrag } from "react-dnd";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../../utils/types";

export default function IngredientCard({ ingredient }) {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector((store) => store.burgerConstructor);
  const openModalWindow = (item) => {
    dispatch({
      type: ADD_DETAILS,
      ingredient: item,
    });
    dispatch({
      type: OPEN_MODAL_WINDOW,
      value: "ingredient",
    });
  };

  const count =
    ingredient.type === "bun"
      ? selectedIngredients.bun?._id === ingredient._id
        ? 2
        : 0
      : selectedIngredients.ingredients.filter(
          (el) => el._id === ingredient._id
        ).length;

  const [{}, dragRef] = useDrag({
    type: ingredient.type === "bun" ? "bun" : "filing",
    item: ingredient,
  });
  return (
    <div
      className={styles.container}
      onClick={() => openModalWindow(ingredient)}
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
  );
}

IngredientCard.propTypes = {
  ingredient: ingredientType,
};
