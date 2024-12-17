import styles from "./login.module.css";
import AppHeader from "../../components/app-header/app-header";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginFormSetValue } from "../../services/login-form-slice";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const loginForm = useSelector((state) => state.loginForm);

  const handleInputChange = (e) => {
    dispatch(
      loginFormSetValue({ field: e.target.name, value: e.target.value })
    );
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <article className={styles.container + " mt-20"}>
        <h2 className={styles.title + " text text_type_main-medium"}>Вход</h2>
        <form className={styles.form}>
          <Input
            name={"email"}
            type={"email"}
            placeholder={"E-mail"}
            value={loginForm.email}
            onChange={handleInputChange}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1 mt-6"
          />
          <Input
            name={"password"}
            type={"password"}
            placeholder={"Пароль"}
            value={loginForm.password}
            onChange={handleInputChange}
            required={true}
            icon={"ShowIcon"}
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
