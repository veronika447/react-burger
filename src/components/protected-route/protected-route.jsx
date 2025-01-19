import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import PropTypes from "prop-types";

export const ProtectedRouteElement = ({ element }) => {
  const user = useSelector((state) => state.auth.user);

  return user ? element : <Navigate to="/login" replace />;
};

ProtectedRouteElement.propTypes = {
  element: PropTypes.node,
};
