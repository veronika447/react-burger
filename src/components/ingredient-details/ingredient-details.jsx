import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";

export default function IngredientDetails({
  src,
  name,
  calories,
  proteins,
  fat,
  carbohydrates,
}) {
  // const ingredient = ingredients.find((item) => item._id === id);
  return (
    <div className={styles.ingredientDetails}>
      <img src={src} alt={name} className={styles.ingredientImage} />
      <h3 className="text text_type_main-medium mt-4">{name}</h3>
      <div className={styles.nutritionalValueContainer + " mt-8"}>
        <p
          className={
            styles.nutritionalValue +
            " text text_type_main-default text_color_inactive"
          }
        >
          Калории, ккал{" "}
          <span className={styles.value + " text text_type_digits-medium"}>
            {calories}
          </span>
        </p>
        <p
          className={
            styles.nutritionalValue +
            " text text_type_main-default text_color_inactive"
          }
        >
          Белки, г{" "}
          <span className={styles.value + " text text_type_digits-medium"}>
            {proteins}
          </span>
        </p>
        <p
          className={
            styles.nutritionalValue +
            " text text_type_main-default text_color_inactive"
          }
        >
          Жиры, г{" "}
          <span className={styles.value + " text text_type_digits-medium"}>
            {fat}
          </span>
        </p>
        <p
          className={
            styles.nutritionalValue +
            " text text_type_main-default text_color_inactive"
          }
        >
          Углеводы, г{" "}
          <span className={styles.value + " text text_type_digits-medium"}>
            {carbohydrates}
          </span>
        </p>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType),
  id: PropTypes.string,
};
