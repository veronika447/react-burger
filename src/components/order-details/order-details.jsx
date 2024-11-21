import styles from "./order-details.module.css";
import pathImg from "../../images/done.png";

export default function OrderDetails({ orderNumber }) {
  return (
    <div className={styles.orderDetails}>
      <h2 className={styles.orderNumber + " text text_type_digits-large mt-20"}>
        {orderNumber}
      </h2>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img className="mt-15" alt="done" src={pathImg}></img>
      <p className="text text_type_main-small mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive mt-2 mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}