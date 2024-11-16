import styles from "./ingredient.module.css";
import PropTypes from "prop-types";

import IngredientCard from "../ingredient-card/ingredient-card";
import { ingredientType } from "../../utils/types";

export default function Ingredients({
  value,
  type,
  data,
  selectedIngredients,
}) {
  return (
    <section>
      <h2 className="text text_type_main-medium mt-10">{value}</h2>
      <div className={styles.container + " pt-6 pb-10"}>
        {data
          .filter((el) => el.type === type)
          .map((el, i) => (
            <IngredientCard
              key={i}
              image={el.image}
              name={el.name}
              price={el.price}
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
  data: PropTypes.arrayOf(ingredientType),
  selectedIngredients: PropTypes.arrayOf(ingredientType),
};
