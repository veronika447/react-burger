import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./home.module.css";
import { useAppDispatch, useAppSelector } from "../../components/app/hooks";
import { AppHeader } from "../../components/app-header/app-header";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { Modal } from "../../components/modal/modal";
import { OrderDetails } from "../../components/order-details/order-details";
import { getIngredients } from "../../services/ingredients-slice";
export const BASE_URL = "https://norma.nomoreparties.space/api";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { ingredientsRequest, ingredientsFailed } = useAppSelector(
    (state) => state.ingredients
  );
  const { orderRequest, orderFailed } = useAppSelector((state) => state.order);
  const modalValue = useAppSelector((state) => state.modalValue.value);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  if (ingredientsFailed) {
    return <div>Ошибка</div>;
  }

  if (orderFailed) {
    return <div> При создании заказа произошла ошибка</div>;
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
          {(orderRequest || ingredientsRequest) && (
            <div className={styles.loaderContainer}>
              <span className={styles.loader}></span>
            </div>
          )}
        </main>
      </DndProvider>

      {modalValue === "order" && (
        <Modal>{modalValue === "order" && <OrderDetails />}</Modal>
      )}
    </>
  );
};
