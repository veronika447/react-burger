import styles from "./burger-constructor.module.css";

import {
    Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructor({ selectedIngredients }) {
  const bun = selectedIngredients.find((el) => el.type === "bun");
  return (
    <section className={styles.burgerConstructorSection + " pl-4 pr-4 pt-25"}>
      <ul className={styles.list}>
        <li>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image_mobile}
            extraClass="ml-8 pt-4 pb-4 pr-8 pl-6 mr-4"
          />
        </li>
        <li>
          <ul className={styles.listFilling}>
            {selectedIngredients.map(
              (el) =>
                el.type !== "bun" && (
                  <li className={styles.listFillingItem}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={el.name}
                      price={el.price}
                      thumbnail={el.image_mobile}
                      extraClass="pt-4 pb-4 pr-8 pl-6"
                    />
                  </li>
                )
            )}
          </ul>
        </li>
        <li>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image_mobile}
            extraClass="ml-8 pt-4 pb-4 pr-8 pl-6 mr-4"
          />
        </li>
      </ul>
      <div className={styles.price +" mt-10"}>
        <p className="text text_type_digits-medium">
          {selectedIngredients
            .map((el) => el.price)
            .reduce((s, c) => s + c, 0) + bun.price + ' '}
          <CurrencyIcon type="primary" />
        </p>
        <Button htmlType="button" type="primary" size="medium">Оформить заказ</Button>
      </div>
    </section>
  );
}
