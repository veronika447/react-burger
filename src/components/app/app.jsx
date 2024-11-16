import styles from "./app.module.css";

import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/fonts/fonts.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import data from "../../utils/data";
// import { useState } from "react";

export default function App() {
  // const [selectedIngredients, setSelectedIngredients] = useState([]);
  const selectedIngredients = [
    "Краторная булка N-200i",
    "Соус традиционный галактический",
    "Мясо бессмертных моллюсков Protostomia",
    "Плоды Фалленианского дерева",
    "Хрустящие минеральные кольца",
    "Хрустящие минеральные кольца",
  ].map((el) => data.find((item) => item.name === el));
  console.log(selectedIngredients);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <BurgerIngredients
            ingredients={data}
            selectedIngredients={selectedIngredients}
          />
          <BurgerConstructor selectedIngredients={selectedIngredients} />
        </div>
      </main>
    </>
  );
}
