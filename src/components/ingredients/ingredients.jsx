import styles from "./ingredients.module.css";
import PropTypes from "prop-types";

import IngredientCard from "../ingredient-card/ingredient-card";
import { ingredientType } from "../../utils/types";

export default function Ingredients({
  value,
  type,
  ingredients,
  selectedIngredients,
}) {
  return (
    <section>
      <h2 className="text text_type_main-medium mt-10">{value}</h2>
      <div className={styles.container + " pt-6 pb-10"}>
        {ingredients
          .filter((ingredient) => ingredient.type === type)
          .map((ingredient) => (
            <IngredientCard
              key={ingredient._id}
              image={ingredient.image}
              name={ingredient.name}
              price={ingredient.price}
              selectedIngredients={selectedIngredients}
            />
          ))}
      </div>
    </section>
  );
}

Ingredients.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  ingredients: PropTypes.arrayOf(ingredientType),
  selectedIngredients: PropTypes.arrayOf(ingredientType),
};
