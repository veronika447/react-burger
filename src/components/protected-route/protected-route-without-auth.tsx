import { Navigate } from "react-router";
import { useAppSelector } from "../app/store";
import { ReactElement } from "react";

type Props = {
  element: ReactElement;
};

export function ProtectedRouteWithoutAuth({ element }: Props) {
  const user = useAppSelector((state) => state.auth.user);
  return user ? <Navigate to="/" replace /> : element;
}
