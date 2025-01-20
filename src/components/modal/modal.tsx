import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/store";

import { changeValue } from "../../services/modal-window-slice";
import { resetOrderNumber } from "../../services/order-slice";

type Props = {
  children: ReactNode;
  title?: string;
};

export const Modal: FC<Props> = ({ children, title }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const modalWindow = useAppSelector((state) => state.modalValue.value);

  useEffect(() => {
    function onEscClick(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    document.addEventListener("keyup", onEscClick);

    return () => {
      document.removeEventListener("keyup", onEscClick);
    };
  }, []);

  const onClose = () => {
    if (modalWindow === "order") {
      dispatch(resetOrderNumber());
    }
    dispatch(changeValue(null));
    navigate("/");
  };

  return createPortal(
    <>
      <ModalOverlay onClose={() => onClose} />
      <div
        className={styles.modalWindow + " pt-10 pl-10 pr-10 pb-15"}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.modalTitle + " text text_type_main-large mt-1"}>
          {title}
        </h2>
        <div className={styles.icon} onClick={() => onClose()}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </>,
    document.getElementById("react-modals")!
  );
};
