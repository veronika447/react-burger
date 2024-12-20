import styles from "./reset-password.module.css";
import AppHeader from "../../components/app-header/app-header";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordFormSetValue,
  resetPassword,
} from "../../services/reset-password-form-slice";

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.resetPasswordForm.form);

  const handleInputChange = (e) => {
    dispatch(
      resetPasswordFormSetValue({ field: e.target.name, value: e.target.value })
    );
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(resetPassword(form.password, ""))
      .unwrap()
      .then(() => {})
      .catch(() => {
        console.log("Ошибка при сбросе пароля");
      });
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <article className={styles.container + " mt-20"}>
        <h2 className={styles.title + " text text_type_main-medium"}>
          Восстановление пароля
        </h2>
        <form className={styles.form}>
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
            onClick={(e) => handleClick(e)}
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
      </article>
    </div>
  );
};
