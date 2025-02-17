import styles from "./feed-details.module.css";
import { AppHeader } from "../../components/app-header/app-header";
import { OrderInfo } from "../../components/order-info/order-info";

export const FeedDetailsPage = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <OrderInfo />
      </main>
    </>
  );
};
