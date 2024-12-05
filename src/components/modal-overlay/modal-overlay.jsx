import styles from "./modal-overlay.module.css";
import { useDispatch } from "react-redux";
import { REMOVE_DETAILS } from "../../services/actions/ingredient-details";
import { CLOSE_MODAL_WINDOW } from "../../services/actions/modal-window";

export default function ModalOverlay() {
  const dispatch = useDispatch();
  const closeModalWindow = () => {
    dispatch({
      type: REMOVE_DETAILS,
    });
    dispatch({
      type: CLOSE_MODAL_WINDOW,
    });
  };
  return (
    <div
      className={styles.modalOverlay}
      onClick={() => closeModalWindow()}
    ></div>
  );
}

