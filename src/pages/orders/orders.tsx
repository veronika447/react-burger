import styles from "./orders.module.css";
import { AppHeader } from "../../components/app-header/app-header";
import { ProfileNavBar } from "../../components/profile-nav-bar/profile-nav-bar";
import { OrderFeed } from "../../components/order-feed/order-feed";

export const OrdersPage = () => {
  return (
    <div className={styles.container}>
      <AppHeader />
      <main className={styles.main}>
        <ProfileNavBar />
        <OrderFeed />
      </main>
    </div>
  );
};
