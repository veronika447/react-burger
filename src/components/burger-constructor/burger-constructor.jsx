import styles from "./burger-constructor.module.css";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_MODAL_WINDOW } from "../../services/actions/modal-window";
import { v4 } from "uuid";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
// import { ingredientType } from "../../utils/types";

export default function BurgerConstructor() {
  const selectedIngredients = useSelector((store) => store.burgerConstructor);
  console.log(selectedIngredients);
  const dispatch = useDispatch();
  const openModalWindow = () => {
    dispatch({
      type: OPEN_MODAL_WINDOW,
      value: "order",
    });
  };
  return (
    <section className={styles.burgerConstructorSection + " pl-4 pr-4 pt-25"}>
      <ul className={styles.list}>
        <li>
          {selectedIngredients.bun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={selectedIngredients.bun.name + " (верх)"}
              price={selectedIngredients.bun.price}
              thumbnail={selectedIngredients.bun.image_mobile}
              extraClass="ml-8 pt-4 pb-4 pr-8 pl-6 mr-4"
            />
          ) : (
            <p
              className={`${styles.placeholder} ${styles.topBun} text text_type_main-default pt-5`}
            >
              Выберите булки
            </p>
          )}
        </li>
        <li>
          {selectedIngredients.ingredients.length ? (
            <ul className={styles.listFilling}>
              {selectedIngredients.ingredients.map((el) => (
                <li key={v4()} className={styles.listFillingItem}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={el.name}
                    price={el.price}
                    thumbnail={el.image_mobile}
                    extraClass="pt-4 pb-4 pr-8 pl-6"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p
              className={
                styles.placeholder + " text text_type_main-default pt-5"
              }
            >
              Выберите начинку
            </p>
          )}
        </li>
        <li>
          {selectedIngredients.bun ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={selectedIngredients.bun.name + " (низ)"}
              price={selectedIngredients.bun.price}
              thumbnail={selectedIngredients.bun.image_mobile}
              extraClass="ml-8 pt-4 pb-4 pr-8 pl-6 mr-4"
            />
          ) : (
            <p
              className={`${styles.placeholder} ${styles.bottomBun} text text_type_main-default pt-5`}
            >
              Выберите булки
            </p>
          )}
        </li>
      </ul>
      <div className={styles.price + " mt-10"}>
        <p className="text text_type_digits-medium">
          0
          <CurrencyIcon type="primary" />
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={() => openModalWindow()}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

// BurgerConstructor.propTypes = {
//   selectedIngredients: PropTypes.objectOf(
//     PropTypes(ingredientType),
//     PropTypes.arrayOf(ingredientType)
//   ),
// };
