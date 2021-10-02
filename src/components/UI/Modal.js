import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

function Modal(props) {
  return (
    <Fragment>
      {createPortal(
        <div className={styles.backdrop} onClick={props.onClose}></div>,
        document.getElementById("overlays")
      )}
      {createPortal(
        <div className={styles.modal}>
          <div className={styles.content}>{props.children}</div>
        </div>,
        document.getElementById("overlays")
      )}
    </Fragment>
  );
}

export default Modal;
