import { FC, ReactNode } from "react";
import styles from "./nav-item.module.css";

type Props = {
  icon: ReactNode;
  text: string;
  isActive: boolean;
};

export const NavItem: FC<Props> = ({ icon, text, isActive }) => {
  const inactiveClass = "text_color_inactive";
  return (
    <div className={styles.navItem + " p-5 ml-2"}>
      {icon}
      <p
        className={`${!isActive && inactiveClass} ${
          styles.navItemText
        } text text_type_main-default ml-2`}
      >
        {" "}
        {text}{" "}
      </p>
    </div>
  );
};
