import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./app.module.css";

import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/fonts/fonts.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import selectedIngredients from "../../utils/data";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getIngredients } from "../../services/actions/ingredients";

export const API_URL = "https://norma.nomoreparties.space/api/ingredients";

export default function App() {
  const { ingredientsRequest, ingredientsFailed, error, ingredients } =
    useSelector((store) => store.ingredients);
  const modalWindow = useSelector((store) => store.details);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  if (ingredientsFailed) {
    return <div>Ошибка: {error}</div>;
  }
  if (ingredientsRequest) {
    return (
      <div className={styles.loaderContainer}>
        <span className={styles.loader}></span>;
      </div>
    );
  }

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <BurgerIngredients
            ingredients={ingredients}
            selectedIngredients={selectedIngredients}
          />
          <BurgerConstructor selectedIngredients={selectedIngredients} />
        </div>
      </main>

      {modalWindow.window && (
        <Modal
          title={modalWindow.window === "ingredient" && "Детали ингредиента"}
        >
          {modalWindow.window === "ingredient" ? (
            <IngredientDetails {...modalWindow.info} />
          ) : (
            <OrderDetails orderNumber="034536" />
          )}
        </Modal>
      )}
    </>
  );
}
