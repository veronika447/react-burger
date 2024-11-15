import styles from "./ingredient-card.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function IngredientCard({ image, name, price }) {
  return (
    <div className={styles.container}>
      <img src={image} alt={name}></img>
      <div className={styles.priceContainer + " mt-1 mb-1"}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className="text text_type_main-default">{name}</h3>
    </div>
  );
}
