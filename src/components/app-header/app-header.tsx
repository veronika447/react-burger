import styles from "./app-header.module.css";

import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { NavItem } from "./nav-item/nav-item";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";

export const AppHeader = () => {
  const location = useLocation();
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [isConstructorActive, setIsConstructorActive] = useState(true);
  const [isFeedActive, setIsFeedActive] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setIsConstructorActive(true);
      setIsProfileActive(false);
      setIsFeedActive(false);
    } else if (location.pathname.includes("profile")) {
      setIsProfileActive(true);
      setIsConstructorActive(false);
      setIsFeedActive(false);
    } else if (location.pathname.includes("feed")) {
      setIsFeedActive(true);
      setIsConstructorActive(false);
      setIsProfileActive(false);
    } else {
      setIsConstructorActive(false);
      setIsProfileActive(false);
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <nav className={styles.navBar}>
          <Link to="/" className="link">
            <NavItem
              icon={
                <BurgerIcon
                  type={isConstructorActive ? "primary" : "secondary"}
                />
              }
              text="Конструктор"
              isActive={isConstructorActive}
            />
          </Link>
          <Link to="/feed" className="link">
            <NavItem
              icon={<ListIcon type={isFeedActive ? "primary" : "secondary"} />}
              text="Лента заказов"
              isActive={isFeedActive}
            />
          </Link>
        </nav>
        <Logo className="mr-30" />
        <nav className={styles.navBar}>
          <Link to="/profile" className="link">
            <NavItem
              icon={
                <ProfileIcon type={isProfileActive ? "primary" : "secondary"} />
              }
              text="Личный кабинет"
              isActive={isProfileActive}
            />
          </Link>
        </nav>
      </div>
    </header>
  );
};
