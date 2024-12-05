import { Ingredients } from "./ingredients/ingredients";
import styles from "./burger-ingredients.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerIngredients() {
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
        />
        <Ingredients
          value="Соусы"
          type="sauce"
        />
        <Ingredients
          value="Начинки"
          type="main"
        />
      </div>
    </section>
  );
}

