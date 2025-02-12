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

  // const textColor = isProfile &&
  //   status === "Выполнен" ? "rgba(0, 204, 204, 1)" : "rgba(242, 242, 243, 1)";
  return (
    <section className={`${styles.ordersContainer} mt-10`}>
      {orders.map((el) => {
        console.log(el.createdAt)
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
                    // style={{ color: textColor }}
                  >
                    {el.status}
                  </p>
                )}
              </h2>
              <div className={styles.orderData}>
                <div className={styles.ingredients}>
                  {el.ingredients.map((id, index) => {
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
