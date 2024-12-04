import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { REMOVE_DETAILS } from "../../services/actions/modal-window";

export default function ModalOverlay() {
  const dispatch = useDispatch();
  const closeModalWindow = () => {
    dispatch({
      type: REMOVE_DETAILS,
    });
  };
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
