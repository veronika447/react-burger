import styles from "./ingredient-details.module.css";

export default function IngredientDetails({ ingredients, id }) {
  const ingredient = ingredients.find((item) => item._id === id);
  return (
    <div className={styles.ingredientDetails}>
      <h2 className={styles.modalTitle + " text text_type_main-large"}>
        Детали ингредиента
      </h2>
      <img src={ingredient.image_large} alt={ingredient.name} className={styles.ingredientImage} />
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
