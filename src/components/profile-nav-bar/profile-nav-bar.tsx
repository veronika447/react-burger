import styles from "./profile-nav-bar.module.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logoutRequest } from "../../utils/logout";
import { removeUserData } from "../../services/auth/auth-slice";

export const ProfileNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.auth);

  const [isProfileActive, setIsProfileActive] = useState(true);
  const [isOrdersActive, setIsOrdersActive] = useState(false);
  const [isLogoutActive, setIsLogoutActive] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (location.pathname === "/profile") {
      setIsProfileActive(true);
      setIsLogoutActive(false);
      setIsOrdersActive(false);
      setText("В этом разделе вы можете изменить свои персональные данные");
    }
    if (location.pathname === "/profile/orders") {
      setIsOrdersActive(true);
      setIsProfileActive(false);
      setIsLogoutActive(false);
      setText("В этом разделе вы можете просмотреть свою историю заказов");
    }
  }, [location]);

  const logout = () => {
    setIsLogoutActive(true);
    setIsProfileActive(false);
    setIsOrdersActive(false);
    logoutRequest(userData.refreshToken).then((res) => {
      if (res.success) {
        dispatch(removeUserData());
        navigate("/login", { replace: true });
      }
    });
  };

  const inactiveClass = "text_color_inactive";

  return (
    <section className={`${styles.navBar} mt-30`}>
      <Link to="/profile" className="link">
        <h3
          className={`${styles.title} ${
            !isProfileActive && inactiveClass
          } text text_type_main-medium pt-4`}
        >
          Профиль
        </h3>
      </Link>
      <Link to="/profile/orders" className="link">
        <h3
          className={`${styles.title} ${
            !isOrdersActive && inactiveClass
          } text text_type_main-medium pt-4`}
        >
          История заказов
        </h3>
      </Link>
      <h3
        className={`${styles.title}  ${
          !isLogoutActive && inactiveClass
        } text text_type_main-medium pt-4`}
        onClick={() => logout()}
      >
        Выход
      </h3>
      <p className="text text_type_main-small text_color_inactive mt-20">
        {text}
      </p>
    </section>
  );
};
