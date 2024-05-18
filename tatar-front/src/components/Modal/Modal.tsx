import classNames from "classnames";

import styles from "./styles.module.scss";

type Props = {
  active: boolean;
  func: () => void;
  children: React.ReactNode;
};

const Modal = ({ active, func, children }: Props) => {
  return (
    <div
      className={
        active ? classNames(styles.modal, styles.active) : styles.modal
      }
      onClick={func}
    >
      <div
        className={
          active
            ? classNames(styles.modal_content, styles.active)
            : styles.modal_content
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
