import styles from "./profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/app-header/app-header";
import { useState } from "react";
import { request } from "../../utils/request";
import {
  removeUserData,
  changeUserInfo,
  refreshTokens,
} from "../../services/auth-slice";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth);
  const [isChanged, setIsChanged] = useState(false);
  const [actualFormValues, setActualFormValues] = useState({
    name: userData.user ? userData.user.name : "",
    email: userData.user ? userData.user.email : "",
    password: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    e.preventDefault();
    setActualFormValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (userData.user[e.target.name]) {
      if (userData.user[e.target.name] !== e.target.value) {
        setIsChanged(true);
      }
    } else {
      setIsChanged(true);
    }
    setIsSuccess(false);
  };

  const changeUserDataRequest = (token) => {
    return request("/auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user: { name: actualFormValues.name, email: actualFormValues.email },
      }),
    });
  };

  const refreshTokenRequest = (token) => {
    return request("/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token: token }),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    changeUserDataRequest(userData.accessToken)
      .then((res) => {
        if (res.success) {
          dispatch(changeUserInfo({ user: res.user }));
          setIsSuccess(true);
          setIsChanged(false);
        }
      })
      .catch((error) => {
        if (error === 401) {
          refreshTokenRequest(userData.refreshToken).then((res) => {
            if (res.success) {
              const token = res.accessToken.split(" ")[1];
              const refreshToken = res.refreshToken;
              dispatch(
                refreshTokens({
                  accessToken: token,
                  refreshToken: refreshToken,
                })
              );
              changeUserDataRequest(token);
            }
          });
        } else {
          setIsError(true);
        }
      })
      .finally(() => {
        setIsSubmit(false);
      });
  };

  const cancelChanges = (e) => {
    e.preventDefault();
    setActualFormValues({
      name: userData.user.name,
      email: userData.user.email,
      password: "",
    });
    setIsChanged(false);
    setIsError(false);
  };

  const logoutRequest = (token) => {
    return request("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token: token }),
    });
  };

  const logout = () => {
    logoutRequest(userData.refreshToken).then((res) => {
      if (res.success) {
        dispatch(removeUserData());
        navigate("/", { replace: true });
      }
    });
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <div className={`${styles.container}`}>
        <section className={`${styles.navBar} mt-30`}>
          <Link to="/profile" className={styles.link}>
            <h3 className={`${styles.title} text text_type_main-medium pt-4`}>
              Профиль
            </h3>
          </Link>
          <Link to="/orders" className={styles.link}>
            <h3
              className={`${styles.title} text text_type_main-medium text_color_inactive pt-4`}
            >
              История заказов
            </h3>
          </Link>
          <h3
            className={`${styles.title} text text_type_main-medium text_color_inactive pt-4`}
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
                <Button type="secondary" onClick={(e) => cancelChanges(e)}>
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
