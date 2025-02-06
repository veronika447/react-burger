import styles from "./order-card.module.css";
import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderCard: FC = () => {
  return (
    <div className={`${styles.orderCard} p-6`}>
      <div className={styles.orderData}>
        <h3 className="text text_type_digits-default">#034535</h3>
        <p className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20
        </p>
      </div>
      <h2 className="text text_type_main-medium">
        Death Star Starship Main бургер
      </h2>
      <div className={styles.orderData}>
        <div className={styles.ingredients}>
          <div className={styles.ingredientIcon} style={{ zIndex: 5 }}></div>
          <div
            className={styles.ingredientIcon}
            style={{ zIndex: 4, left: "-16px" }}
          ></div>
          <div
            className={styles.ingredientIcon}
            style={{ zIndex: 3, left: "-32px" }}
          ></div>
        </div>
        <div className={styles.price}>
          <p className="text text_type_digits-default">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
