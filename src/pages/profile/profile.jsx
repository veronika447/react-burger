import styles from "./profile.module.css";
import { useSelector} from "react-redux";
import {
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/app-header/app-header";

export const ProfilePage = () => {
  const registerForm = useSelector((state) => state.registerForm);
  
  return (
    <div className={styles.page}>
      <AppHeader />
      <div className={`${styles.container}`}>
        <section className={`${styles.navBar} mt-30`}>
          <h3 className={`${styles.title} text text_type_main-medium pt-4`}>
            Профиль
          </h3>
          <h3
            className={`${styles.title} text text_type_main-medium text_color_inactive pt-4`}
          >
            История заказов
          </h3>
          <h3
            className={`${styles.title} text text_type_main-medium text_color_inactive pt-4`}
          >
            Выход
          </h3>
          <p className="text text_type_main-small text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </section>
        <section className={styles.dataContainer + " mt-20"}>
          <form className={styles.form}>
            <Input
              name={"name"}
              type={"text"}
              placeholder={"Имя"}
              value={registerForm.name}
              icon={"EditIcon"}
              // onChange={handleInputChange}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1 mt-6"
            />
            <Input
              name={"email"}
              type={"email"}
              placeholder={"E-mail"}
              value={registerForm.email}
              icon={"EditIcon"}
              // onChange={handleInputChange}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1 mt-6"
            />
            <Input
              name={"password"}
              type={"password"}
              placeholder={"Пароль"}
              value={registerForm.password}
              icon={"EditIcon"}
              // onChange={handleInputChange}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1 mt-6"
            />
          </form>
        </section>
      </div>
    </div>
  );
};
