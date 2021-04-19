import React from "react";
import { Modal } from "react-bootstrap";
import ErrorModalStyles from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  const { onHide, backendError } = props;
  return (
    <div>
      <Modal
        show={true}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={ErrorModalStyles.modalWrapp}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <div>Internal Server Error</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={ErrorModalStyles.errorWrap}>
            <div>
              <div className={ErrorModalStyles.errorTextWrap}>
                {backendError.status === 500 ? (
                  <div className={ErrorModalStyles.errorText}>
                    The Task with the given id does not exist.
                  </div>
                ) : (
                  <div className={ErrorModalStyles.errorText}>
                    The selected page no longer exists or you have reached us
                    via an incorrect link.
                  </div>
                )}
              </div>
            </div>
            <div className={ErrorModalStyles.errorStatusWrap}>
              <div className={ErrorModalStyles.errorTitle}>Status:</div>
              {backendError.status === 500 ? (
                <div
                  className={ErrorModalStyles.errorValue}
                  style={{ color: "red" }}
                >
                  {backendError.status}
                </div>
              ) : (
                <div
                  className={ErrorModalStyles.errorValue}
                  style={{ color: "yellow" }}
                >
                  {backendError.status}
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ErrorModal;
