import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./app.module.css";

import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/fonts/fonts.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getIngredients } from "../../services/actions/ingredients";

export const BASE_URL = "https://norma.nomoreparties.space/api";

export default function App() {
  const dispatch = useDispatch();
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.ingredients
  );
  const ingredientDetails = useSelector((store) => store.details);
  const { orderRequest, orderFailed } = useSelector((store) => store.order);
  const modalValue = useSelector((store) => store.modalValue.value);
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const openModalWindow = () => {
    setModalState(true);
  };

  const closeModalWindow = () => {
    setModalState(false);
  };

  if (ingredientsFailed) {
    return <div>Ошибка</div>;
  }
  if (ingredientsRequest) {
    return (
      <div className={styles.loaderContainer}>
        <span className={styles.loader}></span>
      </div>
    );
  }
  if (orderFailed) {
    return <div> При создании заказа произошла ошибка</div>;
  }
  if (orderRequest) {
    return (
      <div className={styles.loaderContainer}>
        <span className={styles.loader}></span>
      </div>
    );
  }

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <div className={styles.mainContainer}>
            <BurgerIngredients onOpen={openModalWindow} />
            <BurgerConstructor onOpen={openModalWindow} />
          </div>
        </main>
      </DndProvider>

      {modalState && (
        <Modal
          onClose={closeModalWindow}
          title={modalValue === "ingredient" && "Детали ингредиента"}
        >
          {modalValue === "ingredient" ? (
            <IngredientDetails {...ingredientDetails} />
          ) : (
            <OrderDetails />
          )}
        </Modal>
      )}
    </>
  );
}
