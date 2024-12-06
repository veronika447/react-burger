import styles from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_DETAILS,
  REMOVE_DETAILS,
} from "../../../services/actions/ingredient-details";
import { CHANGE_VALUE } from "../../../services/actions/modal-window";
import { useDrag } from "react-dnd";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../../utils/types";

export default function IngredientCard({ ingredient, onOpen }) {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector((store) => store.burgerConstructor);

  const openIngredientModalWindow = () => {
    dispatch({
      type: CHANGE_VALUE,
      value: "ingredient",
    });
    dispatch({
      type: ADD_DETAILS,
      ingredient: ingredient,
    });
    onOpen();
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
  );
}

IngredientCard.propTypes = {
  ingredient: ingredientType,
  onOpen: PropTypes.func,
};
