import styles from "./feed.module.css";
import { AppHeader } from "../../components/app-header/app-header";
import { OrderCard } from "../../components/order-card/order-card";

export const FeedPage = () => {
  return (
    <>
      <AppHeader />
      <div className={`${styles.container} pt-10`}>
        <h1 className="text text_type_main-large">Лента заказов</h1>
        <div className={`${styles.itemsContainer} mt-5`}>
          <section className={`${styles.orders} pr-2`}>
            <OrderCard />
          </section>
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
