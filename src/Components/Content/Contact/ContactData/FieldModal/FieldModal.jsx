import React, { PureComponent } from "react";
import { Modal } from "react-bootstrap";
import FieldModalStyles from "./FieldModal.module.css";

class FieldModal extends React.PureComponent {
  render() {
    return (
      <div>
        <Modal
          show={true}
          onHide={this.props.onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className={FieldModalStyles.modalWrapp}
        >
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div>Validation Error</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.fieldmodal === !this.props.empty && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "red",
                }}
              >
                <h5>Fields cannot be empty</h5>
              </div>
            )}
            {this.props.fieldmodal === this.props.error && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "red",
                }}
              >
                <h5>Email must contain @...</h5>
              </div>
            )}
            {this.props.fieldmodal === this.props.database && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "green",
                }}
              >
                <h5>Your opinion has been sent successfully</h5>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default FieldModal;
