import React, { PureComponent } from "react";
import { Modal } from "react-bootstrap";
import ContactModalStyles from "./ContactModal.module.css";

class ContactModal extends React.PureComponent {
  render() {
    return (
      <div>
        <Modal
          show={true}
          onHide={this.props.onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className={ContactModalStyles.modalWrapp}
        >
          <Modal.Header closeButton>
            <Modal.Title
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {this.props.ContactModal === this.props.database ? (
                <div>Notification</div>
              ) : (
                <div>Error</div>
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.ContactModal === this.props.backendError && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "red",
                  paddingRight: "35px",
                }}
              >
                <h5>Failed to load resource</h5>
              </div>
            )}
            {this.props.ContactModal === this.props.database && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#2bb84ac0",
                }}
              >
                <h5>Your message has been sent successfully</h5>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ContactModal;
