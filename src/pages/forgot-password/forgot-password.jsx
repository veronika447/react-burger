import styles from "./forgot-password.module.css";
import AppHeader from "../../components/app-header/app-header";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordFormSetValue } from "../../services/forgot-password-form-slice";

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.forgotPasswordForm.email);
  const handleInputChange = (e) => {
    dispatch(forgotPasswordFormSetValue(e.target.value));
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
            name={"email"}
            type={"email"}
            placeholder={"Укажите e-mail"}
            value={email}
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
