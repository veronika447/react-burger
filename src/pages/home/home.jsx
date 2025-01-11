import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./home.module.css";

import AppHeader from "../../components/app-header/app-header";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { Modal } from "../../components/modal/modal";
import OrderDetails from "../../components/order-details/order-details";
import { getIngredients } from "../../services/ingredients-slice";
export const BASE_URL = "https://norma.nomoreparties.space/api";

export const HomePage = () => {
  const dispatch = useDispatch();
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => state.ingredients
  );
  const { orderRequest, orderFailed } = useSelector((state) => state.order);
  const modalValue = useSelector((state) => state.modalValue.value);

  useEffect(() => {
    dispatch(getIngredients());
    // return () => 
  }, []);

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
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      </DndProvider>

      {modalValue === "order" && (
        <Modal>{modalValue === "order" && <OrderDetails />}</Modal>
      )}
    </>
  );
};
