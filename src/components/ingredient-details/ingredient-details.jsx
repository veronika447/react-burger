import { useSelector } from "react-redux";
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";

export default function IngredientDetails() {
  const ingredient = useSelector((state) => state.details);
  console.log(1);
  return (
    <div className={styles.ingredientDetails}>
      <img
        src={ingredient.src}
        alt={ingredient.name}
        className={styles.ingredientImage}
      />
      <h3 className="text text_type_main-medium mt-4">{ingredient.name}</h3>
      <div className={styles.nutritionalValueContainer + " mt-8"}>
        <p
          className={
            styles.nutritionalValue +
            " text text_type_main-default text_color_inactive"
          }
        >
          Калории, ккал{" "}
          <span className={styles.value + " text text_type_digits-medium"}>
            {ingredient.calories}
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
            {ingredient.proteins}
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
            {ingredient.fat}
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
            {ingredient.carbohydrates}
          </span>
        </p>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
};
