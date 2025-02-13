import styles from "./order-info.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../app/hooks";
import { useParams } from "react-router";
import { getOrder } from "../../utils/get-order";
import { useEffect, useRef, useState } from "react";

export const OrderInfo = () => {
  const params = useParams();
  const orders = useAppSelector((state) => state.orderFeed.data?.orders);
  const [uniqIngredients, setUniqIngredients] = useState<string[]>([]);
  const [order, setOrder] = useState(
    orders?.find((el) => el.number.toString() === params.number)
  );
  // let order = orders?.find((el) => el.number.toString() === params.number);

  useEffect(() => {
    const set = new Set(order?.ingredients);
    setUniqIngredients(Array.from(set));
  }, [order]);

  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const statusText = {
    done: "Выполнен",
    pending: "Готовится",
    created: "Создан",
  };
  if (!order) {
    getOrder(params.number!).then((res) => {
      if (res.success) {
        setOrder(res.order);
      } else {
        return (
          <div className={styles.loaderContainer}>
            <span className={styles.loader}></span>
          </div>
        );
      }
    });
  }
  return (
    <div className={styles.infoContainer}>
      <h3
        className="text text_type_digits-default"
        style={{ textAlign: "center" }}
      >
        {`#${order!.number}`}
      </h3>
      <h3 className="text text_type_main-medium mt-10">{order!.name}</h3>
      <p
        className="text text_type_main-default mt-3"
        style={{ color: "rgba(0, 204, 204, 1)" }}
      >
        {statusText[order!.status]}
      </p>
      <h3 className="text text_type_main-medium mt-15 mb-6">Состав:</h3>
      <ul className={styles.ingredientsList}>
        {uniqIngredients.map((el) => {
          const ingredient = ingredients[el];
          const current = order!.ingredients.filter(
            (item) => item === el
          ).length;
          return (
            <li className={`${styles.listItem} mr-6`} key={el}>
              <div className={styles.listItemContainer}>
                <div className={`${styles.icon} ml-1`}>
                  <img
                    src={ingredient.image_mobile}
                    alt="icon"
                    width={60}
                    height={60}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <p className="text text_type_main-default ml-4">
                  {ingredient.name}
                </p>
              </div>
              <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">{`${current} x ${ingredient.price}`}</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={`${styles.timePriceContainer} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order!.createdAt)} />
        </p>
        <div className={styles.priceContainer}>
          <p className="text text_type_digits-default mr-2">
            {order!.ingredients.reduce(
              (acc, cur) => acc + ingredients[cur].price,
              0
            )}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
