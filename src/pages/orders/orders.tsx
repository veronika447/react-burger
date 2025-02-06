import styles from "./orders.module.css";
import { AppHeader } from "../../components/app-header/app-header";
import { ProfileNavBar } from "../../components/profile-nav-bar/profile-nav-bar";
import { OrderCard } from "../../components/order-card/order-card";
import { Link } from "react-router";

export const OrdersPage = () => {
  return (
    <div className={styles.container}>
      <AppHeader />
      <main className={styles.main}>
        <ProfileNavBar />
        <section className={`${styles.ordersContainer} mt-10`}>
          <Link to="/profile/orders/123" className="link">
            <OrderCard />
          </Link>
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </section>
      </main>
    </div>
  );
};
