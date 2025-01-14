import { Routes, Route, useLocation } from "react-router";

import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/fonts/fonts.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/common.css";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";

import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  HomePage,
  DetailsPage,
  ProfilePage,
  OrdersPage,
  NotFoundPage
} from "../../pages";

import { Modal } from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

export const BASE_URL = "https://norma.nomoreparties.space/api";

export default function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  return (
    <>
      <Routes location={previousLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/ingredients/:id" element={<DetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {previousLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}
