import styles from "./profile-order-details.module.css";
import { AppHeader } from "../../components/app-header/app-header";
import { OrderInfo } from "../../components/order-info/order-info";

export const ProfileOrderDetailsPage = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <OrderInfo />
      </main>
    </>
  );
};
