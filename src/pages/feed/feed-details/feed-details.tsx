import styles from "./feed-details.module.css";
import { AppHeader } from "../../../components/app-header/app-header";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const FeedDetailsPage = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.infoContainer}>
          <h3
            className="text text_type_digits-default"
            style={{ textAlign: "center" }}
          >
            #034533
          </h3>
          <h3 className="text text_type_main-medium mt-10">
            Black Hole Singularity острый бургер
          </h3>
          <p
            className="text text_type_main-default mt-3"
            style={{ color: "rgba(0, 204, 204, 1)" }}
          >
            Выполнен
          </p>
          <h3 className="text text_type_main-medium mt-15 mb-6">Состав:</h3>
          <ul className={styles.ingredientsList}>
            <li className={`${styles.listItem} mr-6`}>
              <div className={styles.listItemContainer}>
                <div className={`${styles.icon} ml-1`}></div>
                <p className="text text_type_main-default ml-4">
                  Флюоресцентная булка R2-D3
                </p>
              </div>
              <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">2 x 20</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
            <li className={`${styles.listItem} mr-6`}>
              <div className={styles.listItemContainer}>
                <div className={`${styles.icon} ml-1`}></div>
                <p className="text text_type_main-default ml-4">
                  Филе Люминесцентного тетраодонтимформа
                </p>
              </div>
              <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">1 x 300</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>{" "}
            <li className={`${styles.listItem} mr-6`}>
              <div className={styles.listItemContainer}>
                <div className={`${styles.icon} ml-1`}></div>
                <p className="text text_type_main-default ml-4">
                  Соус традиционный галактический
                </p>
              </div>
              <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">1 x 30</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>{" "}
            <li className={`${styles.listItem} mr-6`}>
              <div className={styles.listItemContainer}>
                <div className={`${styles.icon} ml-1`}></div>
                <p className="text text_type_main-default ml-4">
                  Плоды фалленианского дерева
                </p>
              </div>
              <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">1 x 80</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
            <li className={`${styles.listItem} mr-6`}>
              <div className={styles.listItemContainer}>
                <div className={`${styles.icon} ml-1`}></div>
                <p className="text text_type_main-default ml-4">
                  Флюоресцентная булка R2-D3
                </p>
              </div>
              <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">2 x 20</p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          </ul>
          <div className={`${styles.timePriceContainer} mt-10`}>
            <p className="text text_type_main-default text_color_inactive">
              Вчера, 13:50
            </p>
            <div className={styles.priceContainer}>
              <p className="text text_type_digits-default mr-2">510</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
