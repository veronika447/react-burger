import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("react-modals");

export default function Modal({ children }) {
  return createPortal(
    <>
      <ModalOverlay />
      <div className={styles.modalWindow + " pt-10 pl-10 pr-10 pb-15"}>
        <div className={styles.icon}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
}
