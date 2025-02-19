import styles from "./login.module.css";
import { useEffect, useState } from "react";
import { AppHeader } from "../../components/app-header/app-header";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../components/app/hooks";
import {
  loginFormSetValue,
  resetForm,
} from "../../services/login-form/login-form-slice";
import { setUserData } from "../../services/auth/auth-slice";
import { loginRequest } from "../../utils/login";
import type { FormEvent, ChangeEvent } from "react";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginForm = useAppSelector((state) => state.loginForm);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, []);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    loginRequest(loginForm.email, loginForm.password)
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
      .catch((err: number) => {
        if (err === 401) {
          setErrorMessage("Неверный email или пароль");
        } else {
          setErrorMessage(`Ошибка ${err}`);
        }
        setError(true);
      })
      .finally(() => {
        setIsSubmit(false);
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setErrorMessage(null);
    dispatch(
      loginFormSetValue({ field: e.target.name, value: e.target.value })
    );
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <section className={styles.container + " mt-20"}>
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
            extraClass={`${error && styles.error} ml-1 mt-6`}
            disabled={isSubmit}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <PasswordInput
            name={"password"}
            value={loginForm.password}
            onChange={handleInputChange}
            extraClass={`${error && styles.error} ml-1 mt-6`}
            disabled={isSubmit}
          />
          {error && (
            <span className={`${styles.errorMessage} ml-8`}>
              {errorMessage}
            </span>
          )}
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
          <Link to="/register" className="link">
            <span className={styles.spanText}> Зарегистрироваться</span>
          </Link>
        </p>
        <p className="text text_type_main-small text_color_inactive mt-4">
          Забыли пароль?
          <Link to="/forgot-password" className="link">
            <span className={styles.spanText}> Восстановить пароль</span>
          </Link>
        </p>
      </section>
    </div>
  );
};
