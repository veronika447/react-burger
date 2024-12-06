import styles from "./ingredients.module.css";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { useSelector } from "react-redux";

import IngredientCard from "../ingredient-card/ingredient-card";

export const Ingredients = forwardRef(({ value, type, onOpen }, ref) => {
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  return (
    <section ref={ref}>
      <h2 className="text text_type_main-medium mt-10">{value}</h2>
      <div className={styles.container + " pt-6 pb-10"}>
        {ingredients
          .filter((ingredient) => ingredient.type === type)
          .map((ingredient) => (
            <IngredientCard
              key={ingredient._id}
              ingredient={ingredient}
              onOpen={onOpen}
            />
          ))}
      </div>
    </section>
  );
});

Ingredients.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  onOpen: PropTypes.func,
};
