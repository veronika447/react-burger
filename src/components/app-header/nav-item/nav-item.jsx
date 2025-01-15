import styles from "./nav-item.module.css";
import PropTypes from "prop-types";

export default function NavItem({ icon, text, isActive }) {
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

    // </a>
  );
}

NavItem.propTypes = {
  text: PropTypes.string,
  sectionId: PropTypes.string,
  isActive: PropTypes.bool,
};
