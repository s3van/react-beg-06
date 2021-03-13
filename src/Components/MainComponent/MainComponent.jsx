import React, { Component, createRef} from "react";
import { Modal } from "react-bootstrap";
import MainComponentStyles from "./MainComponent.module.css"
import PropTypes from "prop-types";


class AddTaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      title: "",
      description: "",
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
    const formData = {
      title: this.state.title,
      description: this.state.description,
    };
    this.props.onSubmit1(formData);
    this.props.onHide1();
  };

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    const { onHide1, isAnyTaskChecked } = this.props;

    return (
      <Modal
        show={true}
        onHide={onHide1}
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
            <div>Add Task</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={MainComponentStyles.wrapper}>
            <div className={MainComponentStyles.item}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={this.handleChange}
                onKeyPress={this.handleS}
                value={this.state.title}
                disabled={isAnyTaskChecked}
                ref={this.inputRef}
                onSubmit1={(e) => e.preventDefault()}
              />
              <textarea
                name="description"
                onChange={this.handleChange}
                className={MainComponentStyles.textarea}
                placeholder="Description"
                value={this.state.description}
                disabled={isAnyTaskChecked}
                onSubmit1={(e) => e.preventDefault()}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <div className={MainComponentStyles.footer}>
          <button
            onClick={this.handleS}
            className={MainComponentStyles.btn1}
          >
            Add
          </button>
          <button
            onClick={this.props.onHide1}
            className={MainComponentStyles.btn2}
          >
            Close
          </button>
        </div>
      </Modal>
    );
  }
}

AddTaskModal.propTypes = {
  onSubmit1: PropTypes.func.isRequired,
  isAnyTaskChecked: PropTypes.bool.isRequired,
  onHide1: PropTypes.func.isRequired,
};

class EditTaskModal extends React.Component {
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
    this.props.onSubmit2(this.state);
    this.props.onHide2();
  };

  componentDidMount() {
    this.titleInputRef.current.focus();
  }

  render() {
    const { onHide2 } = this.props;
    const { title, description } = this.state;

    return (
      <Modal
        show={true}
        onHide={onHide2}
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
          <div className={MainComponentStyles.wrapper}>
            <div className={MainComponentStyles.item}>
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
                className={MainComponentStyles.textarea}
                placeholder="Description"
                value={this.state.description}
                onSubmit={(e) => e.preventDefault()}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <div className={MainComponentStyles.footer}>
          <button
            onClick={this.handleS}
            className={MainComponentStyles.btn1}
          >
            Save
          </button>
          <button
            onClick={this.props.onHide2}
            className={MainComponentStyles.btn2}
          >
            Close
          </button>
        </div>
      </Modal>
    );
  }
}

EditTaskModal.propTypes = {
  onSubmit2: PropTypes.func.isRequired,
  onHide2: PropTypes.func.isRequired,
  editableTask: PropTypes.exact({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export  {AddTaskModal, EditTaskModal};


