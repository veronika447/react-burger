import { Ingredients } from "./ingredients/ingredients";
import styles from "./burger-ingredients.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";

export const BurgerIngredients = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLElement>(null);
  const sauceRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [isBunActive, setIsBunActive] = useState(true);
  const [isSauceActive, setIsSauceActive] = useState(false);
  const [isMainActive, setIsMainActive] = useState(false);

  const handleOnScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    e.preventDefault();
    const distances = [];
    if (
      !containerRef.current ||
      !bunsRef.current ||
      !sauceRef.current ||
      !mainRef.current
    ) {
      return;
    }
    const containerPosition = containerRef.current.getBoundingClientRect();
    const containerHeight = containerPosition.height;
    const containerPositionY = containerPosition.y + containerHeight;
    const bunsPositionY = bunsRef.current.getBoundingClientRect().y;
    const saucePositionY = sauceRef.current.getBoundingClientRect().y;
    const mainPositionY = mainRef.current.getBoundingClientRect().y;
    distances.push(Math.abs(bunsPositionY - containerPositionY));
    distances.push(Math.abs(saucePositionY - containerPositionY));
    distances.push(Math.abs(mainPositionY - containerPositionY));
    const [bunsDistance, sauceDistance, mainDistance] = distances;
    if (bunsDistance <= sauceDistance && bunsDistance < mainDistance) {
      setIsBunActive(true);
      setIsMainActive(false);
      setIsSauceActive(false);
    } else if (sauceDistance <= mainDistance && sauceDistance < bunsDistance) {
      setIsBunActive(false);
      setIsSauceActive(true);
      setIsMainActive(false);
    } else {
      setIsBunActive(false);
      setIsMainActive(true);
      setIsSauceActive(false);
    }
  };

  return (
    <section className={styles.burgersIngredientSection}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={styles.tabsContainer + " mt-5"} ref={containerRef}>
        <Tab value="Булки" active={isBunActive} onClick={() => {}}>
          Булки
        </Tab>
        <Tab value="Соусы" active={isSauceActive} onClick={() => {}}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={isMainActive} onClick={() => {}}>
          Начинки
        </Tab>
      </div>
      <div
        className={styles.ingredientContainer}
        onScroll={(e) => handleOnScroll(e)}
      >
        <Ingredients value="Булки" type="bun" ref={bunsRef} />
        <Ingredients value="Соусы" type="sauce" ref={sauceRef} />
        <Ingredients value="Начинки" type="main" ref={mainRef} />
      </div>
    </section>
  );
};
