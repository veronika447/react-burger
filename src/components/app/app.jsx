import { useEffect, useState } from "react";
import styles from "./app.module.css";

import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/fonts/fonts.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import selectedIngredients from "../../utils/data";
// import IngredientDetails from "../ingredient-details/ingredient-details";
// import Modal from "../modal/modal";
// import OrderDetails from "../order-details/order-details";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

export default function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setIngredients(result.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <>
        <AppHeader />
        <main className={styles.main}>
          <div className={styles.mainContainer}>
            {
              <BurgerIngredients
                ingredients={ingredients}
                selectedIngredients={selectedIngredients}
              />
            }
            {<BurgerConstructor selectedIngredients={selectedIngredients} />}
          </div>
        </main>
        {/* <Modal> */}
        {/* <IngredientDetails ingredient={selectedIngredients[0]} /> */}
        {/* <OrderDetails orderNumber="034536" /> */}
        {/* </Modal> */},
      </>
    );
  }
}
