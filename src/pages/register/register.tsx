import styles from "./register.module.css";
import { AppHeader } from "../../components/app-header/app-header";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../components/app/hooks";
import {
  registerFormSetValue,
  resetForm,
} from "../../services/register-form/register-form-slice";
import { registerRequest } from "../../utils/register";
import { setUserData } from "../../services/auth/auth-slice";
import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const registerForm = useAppSelector((state) => state.registerForm);
  const [isSubmit, setIsSubmit] = useState(false);

  const register = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);

    registerRequest(
      registerForm.email,
      registerForm.password,
      registerForm.name
    )
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      registerFormSetValue({ field: e.target.name, value: e.target.value })
    );
  };

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
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
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
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <PasswordInput
            name={"password"}
            value={registerForm.password}
            onChange={handleInputChange}
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
          <Link to="/login" className="link">
            <span className={styles.spanText}> Войти</span>
          </Link>
        </p>
      </article>
    </div>
  );
};
