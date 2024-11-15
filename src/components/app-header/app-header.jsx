import React from "react";
import styles from "./app-header.module.css";

import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import NavItem from "../nav-item/nav-item";

function AppHeader({ sectionId }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer + " ml-10 mt-10 mr-10"}>
        <nav className={styles.navBar}>
          <NavItem
            icon={<BurgerIcon type="primary" />}
            text="Конструктор"
            sectionId={sectionId}
            isActive={true}
          />
          <NavItem
            icon={<ListIcon type="secondary" />}
            text="Лента заказов"
            sectionId={sectionId}
            isActive={false}
          />
        </nav>
        <Logo className="mr-30" />
        <nav className={styles.navBar}>
          <NavItem
            icon={<ProfileIcon type="secondary" />}
            text="Личный кабинет"
            sectionId={sectionId}
            isActive={false}
          />
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
