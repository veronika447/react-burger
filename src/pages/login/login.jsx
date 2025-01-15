import styles from "./login.module.css";
import { useState } from "react";
import AppHeader from "../../components/app-header/app-header";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginFormSetValue, resetForm } from "../../services/login-form-slice";
import { request } from "../../utils/request";
import { setUserData } from "../../services/auth-slice";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginForm = useSelector((state) => state.loginForm);
  const user = useSelector((state) => state.auth.user);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    request("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: loginForm.email,
        password: loginForm.password,
      }),
    })
      .then((res) => {
        if (res.success) {
          const userData = res.user;
          const token = res.accessToken.split(" ")[1];
          const refreshToken = res.refreshToken;
          dispatch(
            setUserData({
              user: userData,
              accessToken: token,
              refreshToken: refreshToken,
            })
          );
          dispatch(resetForm());
          navigate("/");
        }
      })
      .finally(() => {
        setIsSubmit(false);
      });
  };

  const handleInputChange = (e) => {
    dispatch(
      loginFormSetValue({ field: e.target.name, value: e.target.value })
    );
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.page}>
      <AppHeader />
      <article className={styles.container + " mt-20"}>
        <h2 className={styles.title + " text text_type_main-medium"}>Вход</h2>
        <form className={styles.form} onSubmit={(e) => handleLogin(e)}>
          <Input
            name={"email"}
            type={"email"}
            placeholder={"E-mail"}
            value={loginForm.email}
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
            value={loginForm.password}
            onChange={handleInputChange}
            required={true}
            icon={"ShowIcon"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1 mt-6"
            disabled={isSubmit}
          />
          {isSubmit ? (
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              extraClass="mt-6"
            >
              <div className={styles.loaderContainer}>
                <div className={styles.loader}></div>
              </div>
            </Button>
          ) : (
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass="mt-6"
            >
              Войти{" "}
            </Button>
          )}
        </form>
        <p className="text text_type_main-small text_color_inactive mt-20">
          Вы - новый пользователь?
          <Link to="/register" className={styles.link}>
            <span className={styles.spanText}> Зарегистрироваться</span>
          </Link>
        </p>
        <p className="text text_type_main-small text_color_inactive mt-4">
          Забыли пароль?
          <Link to="/forgot-password" className={styles.link}>
            <span className={styles.spanText}> Восстановить пароль</span>
          </Link>
        </p>
      </article>
    </div>
  );
};
