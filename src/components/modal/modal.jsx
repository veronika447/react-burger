import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { useEffect } from "react";

const modalRoot = document.getElementById("react-modals");

export default function Modal({ children, closeModalWindow, title }) {
  function onEscClick(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      closeModalWindow();
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", onEscClick);

    return () => {
      document.removeEventListener("keyup", onEscClick);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay closeModalWindow={closeModalWindow} />
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
