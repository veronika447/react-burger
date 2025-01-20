import { Navigate } from "react-router";
import { useAppSelector } from "../app/store";
import { ReactNode } from "react";

type Props = {
  element: ReactNode;
};

export function ProtectedRouteElement({ element }: Props) {
  const user = useAppSelector((state) => state.auth.user);

  return user ? element : <Navigate to="/login" replace />;
}
