import styles from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { OPEN_MODAL_WINDOW } from "../../services/actions/modal-window";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
} from "../../services/actions/burger-constructor";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { DraggableIngredientWrapper } from "./draggable-ingredient-wrapper/draggable-ingredient-wrapper";

export default function BurgerConstructor() {
  const selectedIngredients = useSelector((store) => store.burgerConstructor);
  const dispatch = useDispatch();
  const openModalWindow = () => {
    dispatch({
      type: OPEN_MODAL_WINDOW,
      value: "order",
    });
  };

  const [{ isHoverTopBun }, topBunRef] = useDrop({
    accept: "bun",
    collect: (monitor) => ({
      isHoverTopBun: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: ADD_BUN,
        bun: item,
      });
    },
  });

  const [{ isHoverBottomBun }, bottomBunRef] = useDrop({
    accept: "bun",
    collect: (monitor) => ({
      isHoverBottomBun: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: ADD_BUN,
        bun: item,
      });
    },
  });

  const [{ isHoverFiling }, filingRef] = useDrop({
    accept: "filing",
    collect: (monitor) => ({
      isHoverFiling: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: ADD_INGREDIENT,
        ingredient: item,
      });
    },
  });

  const boxShadowBun =
    isHoverTopBun || isHoverBottomBun ? "0px 0px 10px  2px lightblue" : "none";

  const boxShadowFiling = isHoverFiling
    ? "0px 0px 10px  2px lightblue"
    : "none";

  const deleteIngredient = (value) => {
    dispatch({
      type: DELETE_INGREDIENT,
      key: value,
    });
  };

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
                  key={el.key}
                  id={el._id}
                  index={index}
                >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={el.name}
                    price={el.price}
                    thumbnail={el.image}
                    extraClass="pt-4 pb-4 pr-8 pl-6"
                    handleClose={() => deleteIngredient(el.key, el._id)}
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
