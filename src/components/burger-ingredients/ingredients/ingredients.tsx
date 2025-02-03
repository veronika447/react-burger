import styles from "./ingredients.module.css";
import { forwardRef } from "react";
import { useAppSelector } from "../../app/hooks";
import { IngredientCard } from "../ingredient-card/ingredient-card";

type Props = {
  value: string;
  type: string;
};

type Ref = HTMLElement;

export const Ingredients = forwardRef<Ref, Props>(({ value, type }, ref) => {
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  return (
    <section ref={ref}>
      <h2 className="text text_type_main-medium mt-10">{value}</h2>
      <div className={styles.container + " pt-6 pb-10"}>
        {ingredients &&
          ingredients
            .filter((ingredient) => ingredient.type === type)
            .map((ingredient) => (
              <IngredientCard key={ingredient._id} ingredient={ingredient} />
            ))}
      </div>
    </section>
  );
});
