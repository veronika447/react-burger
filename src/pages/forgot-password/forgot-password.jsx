import styles from "./forgot-password.module.css";
import AppHeader from "../../components/app-header/app-header";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPasswordFormSetValue,
  resetForm,
} from "../../services/forgot-password-form-slice";
import { useState } from "react";
import { checkEmailRequest } from "../../utils/check-email";

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useSelector((state) => state.forgotPasswordForm);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleInputChange = (e) => {
    dispatch(forgotPasswordFormSetValue(e.target.value));
  };

  const checkEmail = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    localStorage.setItem("forgot-password", true);

    checkEmailRequest(form.email)
      .then((res) => {
        if (res.success) {
          navigate("/reset-password");
          dispatch(resetForm());
        }
      })
      .finally(() => {
        setIsSubmit(false);
      });
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <article className={styles.container + " mt-20"}>
        <h2 className={styles.title + " text text_type_main-medium"}>
          Восстановление пароля
        </h2>
        <form className={styles.form} onSubmit={(e) => checkEmail(e)}>
          <Input
            name={"email"}
            type={"email"}
            placeholder={"Укажите e-mail"}
            value={form.email}
            onChange={handleInputChange}
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
              Восстановить{" "}
            </Button>
          )}
        </form>
        <p className="text text_type_main-small text_color_inactive mt-20">
          Вспомнили пароль?
          <Link to="/login" className={styles.link}>
            <span className={styles.spanText}> Войти</span>
          </Link>
        </p>
      </article>
    </div>
  );
};
