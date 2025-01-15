import styles from "./register.module.css";
import AppHeader from "../../components/app-header/app-header";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  registerFormSetValue,
  resetForm,
} from "../../services/register-form-slice";
import { request } from "../../utils/request";
import { setUserData } from "../../services/auth-slice";
import { useState } from "react";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerForm = useSelector((state) => state.registerForm);
  const user = useSelector((state) => state.auth.user);
  const [isSubmit, setIsSubmit] = useState(false);

  const register = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    request("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: registerForm.email,
        password: registerForm.password,
        name: registerForm.name,
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
      registerFormSetValue({ field: e.target.name, value: e.target.value })
    );
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.page}>
      <AppHeader />
      <article className={styles.container + " mt-20"}>
        <h2 className={styles.title + " text text_type_main-medium"}>
          Регистрация
        </h2>
        <form className={styles.form} onSubmit={(e) => register(e)}>
          <Input
            name={"name"}
            type={"text"}
            placeholder={"Имя"}
            value={registerForm.name}
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
            value={registerForm.email}
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
            value={registerForm.password}
            onChange={handleInputChange}
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
              Зарегистрироваться{" "}
            </Button>
          )}
        </form>
        <p className="text text_type_main-small text_color_inactive mt-20">
          Уже зарегистрированы?
          <Link to="/login" className={styles.link}>
            <span className={styles.spanText}> Войти</span>
          </Link>
        </p>
      </article>
    </div>
  );
};
