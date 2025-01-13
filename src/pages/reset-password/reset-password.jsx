import styles from "./reset-password.module.css";
import AppHeader from "../../components/app-header/app-header";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordFormSetValue } from "../../services/reset-password-form-slice";
import { request } from "../../utils/request";

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.resetPasswordForm);

  const handleInputChange = (e) => {
    dispatch(
      resetPasswordFormSetValue({ field: e.target.name, value: e.target.value })
    );
  };

  const resetPassword = (e) => {
    e.preventDefault();
    request("/password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ password: form.password, token: form.code }),
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
            extraClass="ml-1 mt-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mt-6"
          >
            Сохранить{" "}
          </Button>
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
