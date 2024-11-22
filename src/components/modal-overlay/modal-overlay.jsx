import styles from "./modal-overlay.module.css";

export default function ModalOverlay({ closeModalWindow }) {
  return (
    <div
      className={styles.modalOverlay}
      onClick={() => closeModalWindow()}
    ></div>
  );
}
