import styles from "./profile.module.css";
import type { ChangeEvent, FormEvent, SyntheticEvent } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../components/app/hooks";
import { AppHeader } from "../../components/app-header/app-header";
import { useState } from "react";
import { refreshTokenRequest } from "../../utils/refresh-token";
import { changeUserDataRequest } from "../../utils/change-user-data";
import { changeUserInfo, refreshTokens } from "../../services/auth-slice";
import { ProfileNavBar } from "../../components/profile-nav-bar/profile-nav-bar";

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth);
  const [isChanged, setIsChanged] = useState(false);
  const [actualFormValues, setActualFormValues] = useState({
    name: userData.user ? userData.user.name : "",
    email: userData.user ? userData.user.email : "",
    password: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const eName = e.target.name as "name" | "email";
    const eValue = e.target.value;
    setActualFormValues((prev) => {
      return { ...prev, [e.target.name]: eValue };
    });
    if (userData.user && userData.user[eName]) {
      if (userData.user[eName] !== eValue) {
        setIsChanged(true);
      }
    } else if (userData.user && e.target.name === "password") {
      setIsChanged(true);
    }
    setIsSuccess(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    changeUserDataRequest(
      userData.accessToken,
      actualFormValues.name,
      actualFormValues.email
    )
      .then((res) => {
        if (res.success) {
          dispatch(changeUserInfo({ user: res.user }));
          setIsSuccess(true);
          setIsChanged(false);
        }
      })
      .catch(() => {
        refreshTokenRequest(userData.refreshToken).then((res) => {
          if (res.success) {
            const newToken = res.accessToken.split(" ")[1];
            const newRefreshToken = res.refreshToken;
            dispatch(
              refreshTokens({
                accessToken: newToken,
                refreshToken: newRefreshToken,
              })
            );
            return changeUserDataRequest(
              newToken,
              actualFormValues.name,
              actualFormValues.email
            );
          } else {
            setIsError(true);
          }
        });
      })
      .finally(() => {
        setIsSubmit(false);
      });
  };

  const cancelChanges = (e: SyntheticEvent) => {
    e.preventDefault();
    if (userData.user) {
      setActualFormValues({
        name: userData.user.name,
        email: userData.user.email,
        password: "",
      });
    }
    setIsChanged(false);
    setIsError(false);
  };

  return (
    <div className={styles.page}>
      <AppHeader />
      <div className={`${styles.container}`}>
        <ProfileNavBar />
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
              disabled={isSubmit}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
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
              disabled={isSubmit}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
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
              disabled={isSubmit}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            {isSuccess && (
              <span className={`${styles.completeMessage} mt-2 text`}>
                Данные изменены
              </span>
            )}
            {isError && (
              <span className={`${styles.errorMessage} mt-2 text`}>
                При сохранении данных произошла ошибка
              </span>
            )}{" "}
            {isChanged && isSubmit && (
              <div className={`${styles.btnsContainer} mt-6`}>
                <Button
                  htmlType="button"
                  type="secondary"
                  onClick={(e) => cancelChanges(e)}
                >
                  Отмена
                </Button>
                <Button htmlType="button" type="primary" size="medium">
                  <div className={styles.loaderContainer}>
                    <div className={styles.loader}></div>
                  </div>
                </Button>
              </div>
            )}
            {isChanged && !isSubmit && (
              <div className={`${styles.btnsContainer} mt-6`}>
                <Button
                  htmlType="button"
                  type="secondary"
                  onClick={(e) => cancelChanges(e)}
                >
                  Отмена
                </Button>
                <Button htmlType="submit" type="primary" size="medium">
                  Сохранить
                </Button>
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};
