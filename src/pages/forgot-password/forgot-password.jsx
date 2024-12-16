import styles from "./forgot-password.module.css";
import AppHeader from "../../components/app-header/app-header";
import {
  Button,
  ShowIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router";

export const ForgotPasswordPage = () => {
  return (
    <div className={styles.page}>
      <AppHeader />
      <article className={styles.container + " mt-20"}>
        <h2 className={styles.title + " text text_type_main-medium"}>
          Восстановление пароля
        </h2>
        <form className={styles.form}>
          <div className={styles.formElement + " mt-6 pl-6 pr-6"}>
            <input
              type="email"
              placeholder="Укажите e-mail"
              className={styles.input}
            ></input>
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="mt-6"
          >
            Восстановить{" "}
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
