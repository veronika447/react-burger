import React from "react";
import styles from "./nav-item.module.css";


function NavItem({ icon, text, sectionId }) {
  return (
    <a href={"#" + sectionId} className={styles.navItem + ' p-5 ml-2'}  >
      {icon}
      <p className='text text_type_main-default text_color_inactive ml-2' > {text} </p>
    </a>
  );
}

export default NavItem;
