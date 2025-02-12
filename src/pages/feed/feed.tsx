import styles from "./feed.module.css";
import { AppHeader } from "../../components/app-header/app-header";
import { OrderFeed } from "../../components/order-feed/order-feed";
import { useEffect } from "react";
import { useAppDispatch } from "../../components/app/hooks";
import { wsConnect, wsDisconnect } from "../../services/actions";

export const FeedPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(wsConnect("wss://norma.nomoreparties.space/orders/all"));
    return () => {
      dispatch(wsDisconnect());
    };
  }, []);

  return (
    <>
      <AppHeader />
      <div className={`${styles.container} pt-10`}>
        <h1 className="text text_type_main-large">Лента заказов</h1>
        <div className={`${styles.itemsContainer} mt-5`}>
          <OrderFeed />
          <section className={styles.stats}>
            <div className={styles.ordersBoard}>
              <section className={styles.ordersBoardSection}>
                <h3 className="text text_type_main-medium pb-4">Готовы:</h3>
                <p
                  className={`${styles.doneOrders} text text_type_digits-default mt-2`}
                >
                  034533
                </p>
                <p
                  className={`${styles.doneOrders} text text_type_digits-default mt-2`}
                >
                  034532
                </p>
                <p
                  className={`${styles.doneOrders} text text_type_digits-default mt-2`}
                >
                  034530
                </p>
                <p
                  className={`${styles.doneOrders} text text_type_digits-default mt-2`}
                >
                  034527
                </p>
                <p
                  className={`${styles.doneOrders} text text_type_digits-default mt-2`}
                >
                  034525
                </p>
              </section>
              <section className={styles.ordersBoardSection}>
                <h3 className="text text_type_main-medium pb-4">В работе:</h3>
                <p className="text text_type_digits-default mt-2">034538</p>
                <p className="text text_type_digits-default mt-2">034541</p>
                <p className="text text_type_digits-default mt-2">034542</p>
              </section>
            </div>
            <div>
              <h3 className="text text_type_main-medium">
                Выполнено за все время:
              </h3>
              <p
                className={`${styles.ordersCompleted} text text_type_digits-large`}
              >
                28 752
              </p>
            </div>
            <div>
              <h3 className="text text_type_main-medium">
                Выполнено за сегодня:
              </h3>
              <p
                className={`${styles.ordersCompleted} text text_type_digits-large`}
              >
                138
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
