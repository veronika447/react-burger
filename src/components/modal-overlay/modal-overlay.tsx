import { FC } from "react";
import styles from "./modal-overlay.module.css";

type Props = {
  onClose: () => {};
};

export const ModalOverlay: FC<Props> = ({ onClose }) => {
  return <div className={styles.modalOverlay} onClick={() => onClose()}></div>;
};
