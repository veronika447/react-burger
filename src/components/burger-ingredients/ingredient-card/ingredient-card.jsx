import styles from "./ingredient-card.module.css";
import PropTypes from "prop-types";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../../utils/types";

export default function IngredientCard({
  ingredient,
  selectedIngredients,
  openModalWindow,
}) {
  return (
    <div
      className={styles.container}
      onClick={() => openModalWindow("ingredient", ingredient._id)}
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
