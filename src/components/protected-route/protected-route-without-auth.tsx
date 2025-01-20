import { Navigate } from "react-router";
import { useAppSelector } from "../app/store";
import { FC, ReactNode } from "react";

type Props = {
  element: ReactNode;
};

export const ProtectedRouteWithoutAuth: FC<Props> = ({ element }) => {
  const user = useAppSelector((state) => state.auth.user);
  return user ? <Navigate to="/" replace /> : element;
};
