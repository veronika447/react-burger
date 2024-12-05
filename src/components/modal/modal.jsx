import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { REMOVE_DETAILS } from "../../services/actions/ingredient-details";
import { CLOSE_MODAL_WINDOW } from "../../services/actions/modal-window";

const modalRoot = document.getElementById("react-modals");

export default function Modal({ children, title }) {
  const dispatch = useDispatch();
  const closeModalWindow = () => {
    dispatch({
      type: REMOVE_DETAILS,
    });
    dispatch({
      type: CLOSE_MODAL_WINDOW,
    });
  };

  useEffect(() => {
    function onEscClick(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModalWindow();
      }
    }
    document.addEventListener("keyup", onEscClick);

    return () => {
      document.removeEventListener("keyup", onEscClick);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay />
      <div className={styles.modalWindow + " pt-10 pl-10 pr-10 pb-15"}>
        <h2 className={styles.modalTitle + " text text_type_main-large mt-1"}>
          {title}
        </h2>
        <div className={styles.icon} onClick={() => closeModalWindow()}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
