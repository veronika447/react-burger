import styles from "./orders.module.css";
import { AppHeader } from "../../components/app-header/app-header";
import { ProfileNavBar } from "../../components/profile-nav-bar/profile-nav-bar";
import { OrderFeed } from "../../components/order-feed/order-feed";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../components/app/hooks";
import { wsAuthConnect, wsAuthDisconnect } from "../../services/actions";
import { AUTH_WS_URL } from "../../components/app/app";

export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.accessToken);
  const orders = useAppSelector((state) => state.profileOrders.data?.orders);

  useEffect(() => {
    dispatch(wsAuthConnect(`${AUTH_WS_URL}?token=${token}`));
    return () => {
      dispatch(wsAuthDisconnect());
    };
  }, []);

  return (
    <div className={styles.container}>
      <AppHeader />
      <main className={styles.main}>
        <ProfileNavBar />
        {orders && <OrderFeed orders={orders} isProfile={true} />}
      </main>
    </div>
  );
};
