import React, { PureComponent, createRef } from "react";
import { Modal } from "react-bootstrap";
import MainModalStyles from "./MainModal.module.css";
import PropTypes from "prop-types";

class MainModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      title: "",
      description: "",
      ...props.editableTask,
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleS = (event) => {
    const { key, type } = event;
    if (
      !this.state.title ||
      (type === "keypress" && key !== "Enter") ||
      !this.state.description
    )
      return;
    this.props.onSubmit(this.state);
    this.props.onHide();
  };

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    const { onHide, editableTask } = this.props;

    return (
      <Modal
        show={true}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <div>{!editableTask ? "Add Task " : "Edit Task"}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={MainModalStyles.wrapper}>
            <div className={MainModalStyles.item}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={this.handleChange}
                onKeyPress={this.handleS}
                value={this.state.title}
                ref={this.inputRef}
                onSubmit={(e) => e.preventDefault()}
              />
              <textarea
                name="description"
                onChange={this.handleChange}
                className={MainModalStyles.textarea}
                placeholder="Description"
                value={this.state.description}
                onSubmit={(e) => e.preventDefault()}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <div className={MainModalStyles.footer}>
          <button
            onClick={this.handleS}
            className={MainModalStyles.btn1}
            disabled={!this.state.title || !this.state.description}
          >
            {editableTask ? "Save" : "Add"}
          </button>
          <button
            onClick={(event) => this.props.onHide()}
            className={MainModalStyles.btn2}
            disabled={!this.state.title || !this.state.description}
          >
            {!editableTask ? "Close" : "Cancel"}
          </button>
        </div>
      </Modal>
    );
  }
}

MainModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default MainModal;
