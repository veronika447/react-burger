import { useParams } from "react-router";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../components/app/hooks";
import { AppHeader } from "../../components/app-header/app-header";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import { addDetails } from "../../services/ingredient-details-slice";
import { getIngredients } from "../../services/ingredients-slice";

export const DetailsPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const details = useAppSelector((state) => state.details);

  useEffect(() => {
    dispatch(getIngredients());
    const ingredientId = params.id!;
    const ingredient = ingredients.get(ingredientId)!;
    dispatch(addDetails(ingredient));
  }, [details, params]);

  return (
    <>
      <AppHeader />
      <h2
        className="text text_type_main-large mt-20"
        style={{ textAlign: "center" }}
      >
        Детали ингредиента
      </h2>
      <IngredientDetails />
    </>
  );
};
