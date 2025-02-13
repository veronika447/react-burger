import { Routes, Route, useLocation } from "react-router";

import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  HomePage,
  DetailsPage,
  ProfilePage,
  OrdersPage,
  NotFoundPage,
  FeedPage,
  FeedDetailsPage,
  ProfileOrderDetailsPage,
} from "../../pages";
import { OrderInfo } from "../order-info/order-info";

import { ProtectedRouteElement } from "../protected-route/protected-route";
import { ProtectedRouteWithoutAuth } from "../protected-route/protected-route-without-auth";

import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";

export const BASE_URL = "https://norma.nomoreparties.space/api";

export default function App() {
  const location = useLocation();

  const previousLocation = location.state?.previousLocation;

  return (
    <>
      <Routes location={previousLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<ProtectedRouteWithoutAuth element={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<ProtectedRouteWithoutAuth element={<RegisterPage />} />}
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRouteWithoutAuth element={<ForgotPasswordPage />} />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteWithoutAuth element={<ResetPasswordPage />} />
          }
        />
        <Route path="/ingredients/:id" element={<DetailsPage />} />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />
        <Route
          path="/profile/orders"
          element={<ProtectedRouteElement element={<OrdersPage />} />}
        />
        <Route
          path="profile/orders/:number"
          element={
            <ProtectedRouteElement element={<ProfileOrderDetailsPage />} />
          }
        />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:number" element={<FeedDetailsPage />} />
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
          <Route
            path="feed/:number"
            element={
              <Modal>
                {" "}
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="profile/orders/:number"
            element={
              <Modal>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}
