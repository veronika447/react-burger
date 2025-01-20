import styles from "./profile.module.css";
import { ChangeEvent, FormEvent, SyntheticEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../components/app/store";
import { AppHeader } from "../../components/app-header/app-header";
import { useEffect, useState } from "react";
import { refreshTokenRequest } from "../../utils/refresh-token";
import { changeUserDataRequest } from "../../utils/change-user-data";
import { logoutRequest } from "../../utils/logout";
import {
  removeUserData,
  changeUserInfo,
  refreshTokens,
} from "../../services/auth-slice";

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useAppSelector((state) => state.auth);
  const [isChanged, setIsChanged] = useState(false);
  const [actualFormValues, setActualFormValues] = useState({
    name: userData.user ? userData.user.name : "",
    email: userData.user ? userData.user.email : "",
    password: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProfileActive, setIsProfileActive] = useState(true);
  const [isOrdersActive, setIsOrdersActive] = useState(false);
  const [isLogoutActive, setIsLogoutActive] = useState(false);

  useEffect(() => {
    if (location.pathname === "/profile") {
      setIsProfileActive(true);
      setIsLogoutActive(false);
      setIsOrdersActive(false);
    }
    if (location.pathname === "/profile/orders") {
      setIsOrdersActive(true);
      setIsProfileActive(false);
      setIsLogoutActive(false);
    }
  }, [location]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setActualFormValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (userData.user) {
      if (userData.user[e.target.name]) {
        if (userData.user[e.target.name] !== e.target.value) {
          setIsChanged(true);
        }
      } else {
        setIsChanged(true);
      }
    }
    setIsSuccess(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    changeUserDataRequest(
      userData.accessToken,
      actualFormValues.name,
      actualFormValues.email
    )
      .then((res) => {
        if (res.success) {
          dispatch(changeUserInfo({ user: res.user }));
          setIsSuccess(true);
          setIsChanged(false);
        }
      })
      .catch(() => {
        refreshTokenRequest(userData.refreshToken).then((res) => {
          if (res.success) {
            const newToken = res.accessToken.split(" ")[1];
            const newRefreshToken = res.refreshToken;
            dispatch(
              refreshTokens({
                accessToken: newToken,
                refreshToken: newRefreshToken,
              })
            );
            return changeUserDataRequest(
              newToken,
              actualFormValues.name,
              actualFormValues.email
            );
          } else {
            setIsError(true);
          }
        });
      })
      .finally(() => {
        setIsSubmit(false);
      });
  };

  const cancelChanges = (e: SyntheticEvent) => {
    e.preventDefault();
    if (userData.user) {
      setActualFormValues({
        name: userData.user.name,
        email: userData.user.email,
        password: "",
      });
    }
    setIsChanged(false);
    setIsError(false);
  };

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
    <div className={styles.page}>
      <AppHeader />
      <div className={`${styles.container}`}>
        <section className={`${styles.navBar} mt-30`}>
          <Link to="/profile" className={styles.link}>
            <h3
              className={`${styles.title} ${
                !isProfileActive && inactiveClass
              } text text_type_main-medium pt-4`}
            >
              Профиль
            </h3>
          </Link>
          <Link to="/profile/orders" className={styles.link}>
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
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </section>
        <section className={styles.dataContainer + " mt-20"}>
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <Input
              name={"name"}
              type={"text"}
              placeholder={"Имя"}
              value={actualFormValues.name}
              icon={"EditIcon"}
              onChange={handleInputChange}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1 mt-6"
              disabled={isSubmit}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            <Input
              name={"email"}
              type={"email"}
              placeholder={"E-mail"}
              value={actualFormValues.email}
              icon={"EditIcon"}
              onChange={handleInputChange}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1 mt-6"
              disabled={isSubmit}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            <Input
              name={"password"}
              type={"password"}
              placeholder={"Пароль"}
              value={actualFormValues.password}
              icon={"EditIcon"}
              onChange={handleInputChange}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1 mt-6"
              disabled={isSubmit}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            {isSuccess && (
              <span className={`${styles.completeMessage} mt-2 text`}>
                Данные изменены
              </span>
            )}
            {isError && (
              <span className={`${styles.errorMessage} mt-2 text`}>
                При сохранении данных произошла ошибка
              </span>
            )}{" "}
            {isChanged && isSubmit && (
              <div className={`${styles.btnsContainer} mt-6`}>
                <Button
                  htmlType="button"
                  type="secondary"
                  onClick={(e) => cancelChanges(e)}
                >
                  Отмена
                </Button>
                <Button htmlType="button" type="primary" size="medium">
                  <div className={styles.loaderContainer}>
                    <div className={styles.loader}></div>
                  </div>
                </Button>
              </div>
            )}
            {isChanged && !isSubmit && (
              <div className={`${styles.btnsContainer} mt-6`}>
                <Button
                  htmlType="button"
                  type="secondary"
                  onClick={(e) => cancelChanges(e)}
                >
                  Отмена
                </Button>
                <Button htmlType="submit" type="primary" size="medium">
                  Сохранить
                </Button>
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};
