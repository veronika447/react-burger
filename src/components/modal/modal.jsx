import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { changeValue } from "../../services/modal-window-slice";
import { resetOrderNumber } from "../../services/order-slice";

const modalRoot = document.getElementById("react-modals");

export function Modal({ children, title }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalWindow = useSelector((state) => state.modalValue.value);

  useEffect(() => {
    function onEscClick(e) {
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
      <ModalOverlay onClose={onClose} />
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
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
