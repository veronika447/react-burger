import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { changeValue } from "../../services/modal-window-slice";
import {
  addBun,
  addIngredient,
  deleteIngredient,
} from "../../services/burger-constructor-slice";
import { useDrop } from "react-dnd";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { DraggableIngredientWrapper } from "./draggable-ingredient-wrapper/draggable-ingredient-wrapper";
import { getOrderNumber } from "../../services/order-slice";
import { resetConstructor } from "../../services/burger-constructor-slice";

export default function BurgerConstructor({ onOpen }) {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector((state) => state.burgerConstructor);
  const openModalWindow = () => {
    if (!selectedIngredients.bun) {
      return;
    }
    dispatch(getOrderNumber())
      .unwrap()
      .then(() => {
        dispatch(resetConstructor());
      })
      .catch(() => {
        return;
      });
    onOpen();
    dispatch(changeValue("order"));
  };

  const [{ isHoverTopBun }, topBunRef] = useDrop({
    accept: "bun",
    collect: (monitor) => ({
      isHoverTopBun: monitor.isOver(),
    }),
    drop(item) {
      dispatch(addBun(item));
    },
  });

  const [{ isHoverBottomBun }, bottomBunRef] = useDrop({
    accept: "bun",
    collect: (monitor) => ({
      isHoverBottomBun: monitor.isOver(),
    }),
    drop(item) {
      dispatch(addBun(item));
    },
  });

  const [{ isHoverFiling }, filingRef] = useDrop({
    accept: "filing",
    collect: (monitor) => ({
      isHoverFiling: monitor.isOver(),
    }),
    drop(item) {
      dispatch(addIngredient(item));
    },
  });

  const boxShadowBun =
    isHoverTopBun || isHoverBottomBun ? "0px 0px 10px  2px lightblue" : "none";

  const boxShadowFiling = isHoverFiling
    ? "0px 0px 10px  2px lightblue"
    : "none";

  const totalPrice = useMemo(() => {
    if (selectedIngredients.bun)
      return (
        selectedIngredients.bun.price * 2 +
        selectedIngredients.ingredients.reduce((acc, cur) => acc + cur.price, 0)
      );
    return selectedIngredients.ingredients.reduce(
      (acc, cur) => acc + cur.price,
      0
    );
  }, [selectedIngredients]);

  return (
    <section className={styles.burgerConstructorSection + " pl-4 pr-4 pt-25"}>
      <ul className={styles.list}>
        <li
          ref={topBunRef}
          className={styles.listItem}
          style={{ boxShadow: boxShadowBun }}
        >
          {selectedIngredients.bun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={selectedIngredients.bun.name + " (верх)"}
              price={selectedIngredients.bun.price}
              thumbnail={selectedIngredients.bun.image}
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
        <li ref={filingRef} style={{ boxShadow: boxShadowFiling }}>
          {selectedIngredients.ingredients.length ? (
            <ul className={styles.listFilling}>
              {selectedIngredients.ingredients.map((el, index) => (
                <DraggableIngredientWrapper
                  key={el.uniqueId}
                  id={el._id}
                  index={index}
                >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={el.name}
                    price={el.price}
                    thumbnail={el.image}
                    extraClass="pt-4 pb-4 pr-8 pl-6"
                    handleClose={() => dispatch(deleteIngredient(el.uniqueId))}
                  />
                </DraggableIngredientWrapper>
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
        <li ref={bottomBunRef} style={{ boxShadow: boxShadowBun }}>
          {selectedIngredients.bun ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={selectedIngredients.bun.name + " (низ)"}
              price={selectedIngredients.bun.price}
              thumbnail={selectedIngredients.bun.image}
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
          {totalPrice + " "}
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

BurgerConstructor.propTypes = {
  onOpen: PropTypes.func,
};
