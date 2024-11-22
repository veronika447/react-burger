import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay({ closeModalWindow }) {
  return (
    <div
      className={styles.modalOverlay}
      onClick={() => closeModalWindow()}
    ></div>
  );
}

ModalOverlay.propTypes = {
  closeModalWindow: PropTypes.func,
};
