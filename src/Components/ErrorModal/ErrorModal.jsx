import React, { PureComponent } from "react";
import { Modal } from "react-bootstrap";
import ErrorModalStyles from "./ErrorModal.module.css";

class ErrorModal extends React.PureComponent {
  
  render() {
    return (
      <div>
        <Modal
          show={true}
          onHide={this.props.onHide}
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
                  {this.props.error.status === 500 ? (
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
                {this.props.error.status === 500 ? (
                  <div
                    className={ErrorModalStyles.errorValue}
                    style={{ color: "red" }}
                  >
                    {this.props.error.status}
                  </div>
                ) : (
                  <div
                    className={ErrorModalStyles.errorValue}
                    style={{ color: "yellow" }}
                  >
                    {this.props.error.status}
                  </div>
                )}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ErrorModal;
