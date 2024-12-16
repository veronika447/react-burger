import styles from "./login.module.css";
import AppHeader from "../../components/app-header/app-header";
import {
  Button,
  ShowIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router";

export const LoginPage = () => {
  return (
    <div className={styles.page}>
      <AppHeader />
      <article className={styles.container + " mt-20"}>
        <h2 className={styles.title + " text text_type_main-medium"}>Вход</h2>
        <form className={styles.form}>
          <div className={styles.formElement + " mt-6 pl-6 pr-6"}>
            <input
              type="email"
              placeholder="E-mail"
              className={styles.input}
            ></input>
          </div>
          <div className={styles.formElement + " mt-6 pl-6 pr-6"}>
            <input type="text" placeholder="Пароль"></input>
            <ShowIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="mt-6"
          >
            Войти{" "}
          </Button>
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
