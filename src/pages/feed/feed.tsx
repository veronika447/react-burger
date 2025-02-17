import styles from "./feed.module.css";
import { AppHeader } from "../../components/app-header/app-header";
import { OrderFeed } from "../../components/order-feed/order-feed";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../components/app/hooks";
import { wsConnect, wsDisconnect } from "../../services/actions";
import { Orders } from "../../utils/types";
import { WS_URL } from "../../components/app/app";

export const FeedPage = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.orderFeed.data);
  // const [doneOrders, setDoneOrders] = useState<Orders>([]);
  // const [pendingOrders, setPendingOrders] = useState<Orders>([]);
  useEffect(() => {
    dispatch(wsConnect(WS_URL));
    return () => {
      dispatch(wsDisconnect());
    };
  }, []);

  const doneOrders = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.orders.filter((el) => el.status === "done").slice(0, 8);
  }, [data]);

  const pendingOrders = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.orders.filter((el) => el.status === "pending").slice(0, 8);
  }, [data]);

  // useEffect(() => {
  //   if (data) {
  //     setDoneOrders(
  //       data?.orders?.filter((el) => el.status === "done").splice(0, 8)
  //     );
  //     setPendingOrders(
  //       data?.orders?.filter((el) => el.status === "pending").splice(0, 8)
  //     );
  //   }
  // }, [data]);

  return (
    <>
      <AppHeader />
      <div className={`${styles.container} pt-10`}>
        <h1 className="text text_type_main-large">Лента заказов</h1>
        <div className={`${styles.itemsContainer} mt-5`}>
          {data && <OrderFeed orders={data?.orders} isProfile={false} />}
          <section className={styles.stats}>
            <div className={styles.ordersBoard}>
              <section className={styles.ordersBoardSection}>
                <h3 className="text text_type_main-medium pb-4">Готовы:</h3>
                <div className={styles.boardContainer}>
                  {doneOrders.map((el) => {
                    return (
                      <p
                        className={`${styles.doneOrders} text text_type_digits-default mt-2`}
                        key={el._id}
                      >
                        {el.number}
                      </p>
                    );
                  })}
                </div>
              </section>
              <section className={styles.ordersBoardSection}>
                <h3 className="text text_type_main-medium pb-4">В работе:</h3>
                <div className={styles.boardContainer}>
                  {pendingOrders.map((el) => {
                    return (
                      <p
                        className="text text_type_digits-default mt-2"
                        key={el._id}
                      >
                        {el.number}
                      </p>
                    );
                  })}
                </div>
              </section>
            </div>
            <div>
              <h3 className="text text_type_main-medium">
                Выполнено за все время:
              </h3>
              <p
                className={`${styles.ordersCompleted} text text_type_digits-large`}
              >
                {data?.total}
              </p>
            </div>
            <div>
              <h3 className="text text_type_main-medium">
                Выполнено за сегодня:
              </h3>
              <p
                className={`${styles.ordersCompleted} text text_type_digits-large`}
              >
                {data?.totalToday}
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
