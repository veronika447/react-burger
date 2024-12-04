import Ingredients from "./ingredients/ingredients";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../utils/types";

export default function BurgerIngredients({
  ingredients,
  selectedIngredients,
}) {
  return (
    <section className={styles.burgersIngredientSection}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={styles.tabsContainer + " mt-5"}>
        <Tab value="Булки" active={true}>
          Булки
        </Tab>
        <Tab value="Соусы" active={false}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={false}>
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredientContainer}>
        <Ingredients
          value="Булки"
          type="bun"
          ingredients={ingredients}
          selectedIngredients={selectedIngredients}
        />
        <Ingredients
          value="Соусы"
          type="sauce"
          ingredients={ingredients}
          selectedIngredients={selectedIngredients}
        />
        <Ingredients
          value="Начинки"
          type="main"
          ingredients={ingredients}
          selectedIngredients={selectedIngredients}
        />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType),
  selectedIngredients: PropTypes.arrayOf(ingredientType),
  openModalWindow: PropTypes.func,
};
