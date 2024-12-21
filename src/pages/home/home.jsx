import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./home.module.css";

import AppHeader from "../../components/app-header/app-header";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import Modal from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import { getIngredients } from "../../services/ingredients-slice";
export const BASE_URL = "https://norma.nomoreparties.space/api";

export const HomePage = () => {
  const dispatch = useDispatch();
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => state.ingredients
  );
  const ingredientDetails = useSelector((state) => state.details);
  const { orderRequest, orderFailed } = useSelector((state) => state.order);
  const modalValue = useSelector((state) => state.modalValue.value);
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
};
