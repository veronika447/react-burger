import styles from "./reset-password.module.css";
import { AppHeader } from "../../components/app-header/app-header";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordFormSetValue,
  resetForm,
} from "../../services/reset-password-form-slice";
import { useEffect, useState } from "react";
import { resetPasswordRequest } from "../../utils/reset-password";

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useSelector((state) => state.resetPasswordForm);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const check = localStorage.getItem("forgot-password");
    if (!check) {
      navigate("/login", { replace: true });
    }
    return () => {
      localStorage.removeItem("forgot-password");
      dispatch(resetForm());
      setErrorMessage(null);
      setError(false);
    };
  }, []);

  const handleInputChange = (e) => {
    setErrorMessage(null);
    setError(false);
    dispatch(
      resetPasswordFormSetValue({ field: e.target.name, value: e.target.value })
    );
  };

  const resetPassword = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    resetPasswordRequest(form.password, form.code)
      .then((res) => {
        if (res.success) {
          navigate("/login", { replace: true });
          dispatch(resetForm());
        }
      })
      .catch(() => {
        setError(true);
        setErrorMessage("Неверный код");
      })
      .finally(() => {
        setIsSubmit(false);
      });
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <section className={styles.container + " mt-20"}>
        <h2 className={styles.title + " text text_type_main-medium"}>
          Восстановление пароля
        </h2>
        <form className={styles.form} onSubmit={(e) => resetPassword(e)}>
          <Input
            name={"password"}
            type={"password"}
            placeholder={"Введите новый пароль"}
            value={form.password}
            onChange={handleInputChange}
            icon={"ShowIcon"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1 mt-6"
            disabled={isSubmit}
          />
          <Input
            name={"code"}
            type={"text"}
            placeholder={"Введите код из письма"}
            value={form.code}
            onChange={handleInputChange}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
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
              Сохранить{" "}
            </Button>
          )}
        </form>
        <p className="text text_type_main-small text_color_inactive mt-20">
          Вспомнили пароль?
          <Link to="/login" className={styles.link}>
            <span className={styles.spanText}> Войти</span>
          </Link>
        </p>
      </section>
    </div>
  );
};
