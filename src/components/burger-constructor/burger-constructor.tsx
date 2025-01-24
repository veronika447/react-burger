import styles from "./burger-constructor.module.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
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
import { useNavigate } from "react-router";
import { type IngredientType } from "../../utils/types";

export const BurgerConstructor = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedIngredients = useAppSelector(
    (state) => state.burgerConstructor
  );
  const user = useAppSelector((state) => state.auth.user);
  const [isBunError, setIsBunError] = useState(false);

  const handleOnOrderButtonClick = () => {
    if (!user) {
      return navigate("/login", { replace: true });
    }
    if (!selectedIngredients.bun) {
      setIsBunError(true);
      return;
    }
    dispatch(getOrderNumber())
      .unwrap()
      .then(() => {
        setIsBunError(false);
        dispatch(changeValue("order"));
        dispatch(resetConstructor());
      })
      .catch(() => {
        return;
      });
  };

  const [{ isHoverTopBun }, topBunRef] = useDrop({
    accept: "bun",
    collect: (monitor) => ({
      isHoverTopBun: monitor.isOver(),
    }),
    drop: (item: IngredientType) => {
      setIsBunError(false);
      dispatch(addBun(item));
    },
  });

  const [{ isHoverBottomBun }, bottomBunRef] = useDrop({
    accept: "bun",
    collect: (monitor) => ({
      isHoverBottomBun: monitor.isOver(),
    }),
    drop: (item: IngredientType) => {
      dispatch(addBun(item));
    },
  });

  const [{ isHoverFiling }, filingRef] = useDrop({
    accept: "filing",
    collect: (monitor) => ({
      isHoverFiling: monitor.isOver(),
    }),
    drop: (item: IngredientType) => {
      dispatch(addIngredient(item));
    },
  });

  const boxShadowBun =
    isHoverTopBun || isHoverBottomBun ? "0px 0px 10px  2px lightblue" : "none";

  const boxShadowFiling = isHoverFiling
    ? "0px 0px 10px  2px lightblue"
    : "none";

  const border = isBunError ? "solid red" : "none";

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
          style={{
            boxShadow: boxShadowBun,
            border: border,
            borderTopRightRadius: "88px",
            borderTopLeftRadius: "88px",
            borderBottomLeftRadius: "40px",
            borderBottomRightRadius: "40px",
            width: "536px",
          }}
        >
          {selectedIngredients.bun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={selectedIngredients.bun.name + " (верх)"}
              price={selectedIngredients.bun.price}
              thumbnail={selectedIngredients.bun.image}
              extraClass="pt-4 pb-4 pr-8 pl-6 mr-4"
            />
          ) : (
            <p
              className={`${styles.placeholder} ${styles.topBun} text text_type_main-default pt-5`}
            >
              Выберите булки
            </p>
          )}
        </li>
        <li
          ref={filingRef}
          style={{
            boxShadow: boxShadowFiling,
            borderRadius: "40px",
            width: "536px",
          }}
        >
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
                    handleClose={() =>
                      el.uniqueId && dispatch(deleteIngredient(el.uniqueId))
                    }
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
        <li
          ref={bottomBunRef}
          style={{
            boxShadow: boxShadowBun,
            border: border,
            borderTopLeftRadius: "40px",
            borderTopRightRadius: "40px",
            borderBottomLeftRadius: "88px",
            borderBottomRightRadius: "88px",
            width: "536px",
          }}
        >
          {selectedIngredients.bun ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={selectedIngredients.bun.name + " (низ)"}
              price={selectedIngredients.bun.price}
              thumbnail={selectedIngredients.bun.image}
              extraClass="pt-4 pb-4 pr-8 pl-6 mr-4"
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
          onClick={() => handleOnOrderButtonClick()}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
