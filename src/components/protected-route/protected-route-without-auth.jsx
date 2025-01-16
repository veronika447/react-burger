import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import PropTypes from "prop-types";

export const ProtectedRouteWithoutAuth = ({ element }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? <Navigate to="/" replace /> : element;
};

ProtectedRouteWithoutAuth.propTypes = {
  element: PropTypes.node,
};
