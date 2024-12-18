import styles from "./nav-item.module.css";
import PropTypes from "prop-types";

export default function NavItem({ icon, text, sectionId, isActive }) {
  return (
    <a href={"#" + sectionId} className={styles.navItem + " p-5 ml-2"}>
      {icon}
      <p
        className={
          isActive
            ? "text text_type_main-default ml-2"
            : "text text_type_main-default text_color_inactive ml-2"
        }
      >
        {" "}
        {text}{" "}
      </p>
    </a>
  );
}

NavItem.propTypes = {
  text: PropTypes.string,
  sectionId: PropTypes.string,
  isActive: PropTypes.bool,
};
