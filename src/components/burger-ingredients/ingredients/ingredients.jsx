import styles from "./ingredients.module.css";
import PropTypes from "prop-types";
import { forwardRef } from "react";

import IngredientCard from "../ingredient-card/ingredient-card";
import { ingredientType } from "../../../utils/types";

export const Ingredients = forwardRef(
  ({ value, type, ingredients, selectedIngredients, openModalWindow }, ref) => {
    return (
      <section>
        <h2 className="text text_type_main-medium mt-10">{value}</h2>
        <div className={styles.container + " pt-6 pb-10"}>
          {ingredients
            .filter((ingredient) => ingredient.type === type)
            .map((ingredient) => (
              <IngredientCard
                key={ingredient._id}
                ingredient={ingredient}
                selectedIngredients={selectedIngredients}
                openModalWindow={openModalWindow}
              />
            ))}
        </div>
      </section>
    );
  }
);

Ingredients.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  ingredients: PropTypes.arrayOf(ingredientType),
  selectedIngredients: PropTypes.arrayOf(ingredientType),
  openModalWindow: PropTypes.func,
};
