import styles from "./register.module.css";
import AppHeader from "../../components/app-header/app-header";
import {
  Button,
  ShowIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const RegisterPage = () => {
  return (
    <div className={styles.page}>
      <AppHeader />
      <article className={styles.container + " mt-20"}>
        <h2 className={styles.title + " text text_type_main-medium"}>
          Регистрация
        </h2>
        <form className={styles.form}>
          <div className={styles.formElement + " mt-6 pl-6 pr-6"}>
            <input
              type="text"
              placeholder="Имя"
              className={styles.input}
            ></input>
          </div>
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
            Зарегистрироваться{" "}
          </Button>
        </form>
        <p className="text text_type_main-small text_color_inactive mt-20">
          Уже зарегистрированы?
          <span className={styles.spanText}> Войти</span>
        </p>
      </article>
    </div>
  );
};
