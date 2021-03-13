import React, { PureComponent, createRef } from "react";
import { Modal } from "react-bootstrap";
import EditTaskModalStyles from "./EditTaskModal.module.css";
import PropTypes from "prop-types";

class EditTaskModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.titleInputRef = createRef(null);
    this.state = {
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
    this.titleInputRef.current.focus();
  }

  render() {
    const { onHide } = this.props;
    const { title, description, } = this.state;

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
            <div>Edit Task</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={EditTaskModalStyles.wrapper}>
            <div className={EditTaskModalStyles.item}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={this.handleChange}
                onKeyPress={this.handleS}
                value={this.state.title}
                ref={this.titleInputRef}
                onSubmit={(e) => e.preventDefault()}
              />
              <textarea
                name="description"
                onChange={this.handleChange}
                className={EditTaskModalStyles.textarea}
                placeholder="Description"
                value={this.state.description}
                onSubmit={(e) => e.preventDefault()}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <div className={EditTaskModalStyles.footer}>
          <button
            onClick={this.handleS}
            className={EditTaskModalStyles.btn1}
          >
            Save
          </button>
          <button
            onClick={this.props.onHide}
            className={EditTaskModalStyles.btn2}
          >
            Close
          </button>
        </div>
      </Modal>
    );
  }
}

EditTaskModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  editableTask: PropTypes.exact({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export default EditTaskModal;
