import styles from "./profile.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/app-header/app-header";
import { useState } from "react";

export const ProfilePage = () => {
  const userData = useSelector((state) => state.auth.user);
  const [isChanged, setIsChanged] = useState(false);
  const [actualFormValues, setActualFormValues] = useState({
    name: userData.name,
    email: userData.email,
    password: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setActualFormValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (userData[e.target.name]) {
      if (userData[e.target.name] !== e.target.value) {
        setIsChanged(true);
      }
    } else {
      setIsChanged(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const cancelChanges = (e) => {
    e.preventDefault();
    setActualFormValues({
      name: userData.name,
      email: userData.email,
      password: "",
    });
    setIsChanged(false);
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <div className={`${styles.container}`}>
        <section className={`${styles.navBar} mt-30`}>
          <Link to="/profile" className={styles.link}>
            <h3 className={`${styles.title} text text_type_main-medium pt-4`}>
              Профиль
            </h3>
          </Link>
          <Link to="/orders" className={styles.link}>
            <h3
              className={`${styles.title} text text_type_main-medium text_color_inactive pt-4`}
            >
              История заказов
            </h3>
          </Link>
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
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <Input
              name={"name"}
              type={"text"}
              placeholder={"Имя"}
              value={actualFormValues.name}
              icon={"EditIcon"}
              onChange={handleInputChange}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1 mt-6"
            />
            <Input
              name={"email"}
              type={"email"}
              placeholder={"E-mail"}
              value={actualFormValues.email}
              icon={"EditIcon"}
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
              value={actualFormValues.password}
              icon={"EditIcon"}
              onChange={handleInputChange}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1 mt-6"
            />
            {isChanged && (
              <div className={`${styles.btnsContainer} mt-6`}>
                <Button type="secondary" onClick={(e) => cancelChanges(e)}>
                  Отмена
                </Button>
                <Button type="submit">Сохранить</Button>
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};
