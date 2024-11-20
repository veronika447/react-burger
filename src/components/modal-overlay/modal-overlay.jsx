import { Modal } from "../modal/modal";
import styles from "./modal-overlay.module.css";

export function ModalOverlay({ text }) {
  return (
    <div className={styles.modalOverlay}>
      <Modal text={text} />
    </div>
  );
}
