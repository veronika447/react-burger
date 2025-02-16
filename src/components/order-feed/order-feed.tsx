import styles from "./order-feed.module.css";
import { FC, useEffect } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router";
import { Orders } from "../../utils/types";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { getIngredients } from "../../services/ingredients-slice";

type Props = {
  isProfile: boolean;
  orders: Orders;
};

export const OrderFeed: FC<Props> = ({ orders, isProfile }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const statusText = {
    done: "Выполнен",
    created: "Создан",
    pending: "Готовится",
  };

  return (
    <section
      className={`${styles.ordersContainer} mt-10 pr-2`}
      style={{
        height: isProfile ? "80vh" : "70vh",
      }}
    >
      {[...orders].reverse().map((el) => {
        const status = statusText[el.status];

        let orderIngredients: string[];
        let lastIngredient: string | null = null;
        let current: number = 0;

        if (el.ingredients.length < 5) {
          orderIngredients = el.ingredients;
        } else {
          orderIngredients = el.ingredients.slice(0, 4);
          lastIngredient = el.ingredients[4];
          current = el.ingredients.length - 4;
        }

        return (
          <Link
            to={`${location.pathname}/${el.number}`}
            state={{ previousLocation: location }}
            className="link"
            key={el._id}
          >
            <div className={`${styles.orderCard} p-6`}>
              <div className={styles.orderData}>
                <h3 className="text text_type_digits-default">{`#${el.number}`}</h3>
                <p className="text text_type_main-default text_color_inactive">
                  <FormattedDate date={new Date(el.createdAt)} />
                </p>
              </div>
              <h2 className="text text_type_main-medium">
                {el.name}
                {isProfile && (
                  <p
                    className="text text_type_main-default mt-2"
                    style={{
                      color:
                        status === "Выполнен"
                          ? "rgba(0, 204, 204, 1)"
                          : "rgba(242, 242, 243, 1)",
                    }}
                  >
                    {status}
                  </p>
                )}
              </h2>
              <div className={styles.orderData}>
                <div className={styles.ingredients}>
                  {orderIngredients.map((id, index) => {
                    const imgSrc = ingredients[id]?.image_mobile;
                    return (
                      <div
                        className={styles.ingredientIcon}
                        style={{
                          zIndex: `${el.ingredients.length - index}`,
                          left: `${index * -16}px`,
                        }}
                        key={id + index}
                      >
                        {imgSrc && (
                          <img
                            src={imgSrc}
                            alt="Icon"
                            width={64}
                            height={64}
                            style={{
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                  {lastIngredient && (
                    <>
                      <div
                        className={styles.ingredientIcon}
                        style={{
                          zIndex: `0`,
                          left: "-70px",
                        }}
                      >
                        {ingredients[lastIngredient].image_mobile && (
                          <img
                            src={ingredients[lastIngredient].image_mobile}
                            alt="Icon"
                            width={64}
                            height={64}
                            style={{
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </div>
                      <div
                        style={{
                          width: "64px",
                          height: "60px",
                          backgroundColor: "rgba(28, 28, 33, 1)",
                          position: "relative",
                          zIndex: "1",
                          left: "-136px",
                          top: "4px",
                          opacity: "80%",
                          borderRadius: "100px",
                        }}
                      >
                        <p
                          className="text text_type_main-small mt-4"
                          style={{ textAlign: "center" }}
                        >{`+${current}`}</p>
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.price}>
                  <p className="text text_type_digits-default">
                    {el.ingredients.reduce(
                      (acc, curr) => acc + ingredients[curr].price,
                      0
                    )}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
};
