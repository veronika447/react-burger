import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";

export function Modal() {
  return (
    <div className={styles.modalWindow + " pt-10 pl-10 pr-10 pb-10"}>
      <div className={styles.icon}>
        <CloseIcon type="primary" />
      </div>
    </div>
  );
}
