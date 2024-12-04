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
  const [modalState, setModalState] = useState(null);
  const [selectedIngredientId, setSelectedIngredientId] = useState(null);

  const { ingredientsRequest, ingredientsFailed, error, ingredients } =
    useSelector((store) => store.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  function openModalWindow(value, id) {
    setModalState(value);
    setSelectedIngredientId(id);
  }

  function closeModalWindow() {
    setModalState(null);
    setSelectedIngredientId(null);
  }

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
            openModalWindow={openModalWindow}
          />
          <BurgerConstructor
            selectedIngredients={selectedIngredients}
            openModalWindow={openModalWindow}
          />
        </div>
      </main>

      {modalState && (
        <Modal
          closeModalWindow={closeModalWindow}
          title={modalState === "ingredient" && "Детали ингредиента"}
        >
          {modalState === "ingredient" ? (
            <IngredientDetails
              ingredients={ingredients}
              id={selectedIngredientId}
            />
          ) : (
            <OrderDetails orderNumber="034536" />
          )}
        </Modal>
      )}
    </>
  );
}
