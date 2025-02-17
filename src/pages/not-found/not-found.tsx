import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./not-found.module.css";
import { Link } from "react-router";

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h2 className="text text_type_digits-large">404</h2>
      <h3 className="text text_type_main-default text_color_inactive">
        Страница не найдена
      </h3>
      <Link to="/" className="link">
        <Button htmlType="button" size="small">
          Вернуться на главную
        </Button>
      </Link>
    </div>
  );
};
