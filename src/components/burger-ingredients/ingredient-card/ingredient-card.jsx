import styles from "./ingredient-card.module.css";
import PropTypes from "prop-types";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../../utils/types";

export default function IngredientCard({
  image,
  name,
  price,
  selectedIngredients,
}) {
  return (
    <div className={styles.container}>
      {selectedIngredients.some((el) => el.name === name) ? (
        <Counter count={1} size="default" extraClass="m-1" />
      ) : null}

      <img src={image} alt={name}></img>
      <div className={styles.priceContainer + " mt-1 mb-1"}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className="text text_type_main-default">{name}</h3>
    </div>
  );
}

IngredientCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  selectedIngredients: PropTypes.arrayOf(ingredientType),
};
