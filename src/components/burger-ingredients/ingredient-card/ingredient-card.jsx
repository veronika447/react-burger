import styles from "./ingredient-card.module.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { ADD_DETAILS } from "../../../services/actions/ingredient-details";
import { OPEN_MODAL_WINDOW } from "../../../services/actions/modal-window";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../../utils/types";

export default function IngredientCard({ ingredient, selectedIngredients }) {
  const dispatch = useDispatch();
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
  return (
    <div
      className={styles.container}
      onClick={() => openModalWindow(ingredient)}
    >
      {selectedIngredients.some((el) => el.name === ingredient.name) ? (
        <Counter count={1} size="default" extraClass="m-1" />
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
  selectedIngredients: PropTypes.arrayOf(ingredientType),
  openModalWindow: PropTypes.func,
};
