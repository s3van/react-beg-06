import React, { PureComponent, createRef} from "react";
import { Modal } from "react-bootstrap";
import AddTaskModalStyles from "./AddTaskModal.module.css";
import PropTypes from "prop-types";

class AddTaskModal extends React.PureComponent {
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

  onSubmit = (event) => {
    const { key } = event;
    const { type } = event;
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
    this.props.onSubmit(formData);
    this.props.onHide();
  };

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    const { onHide, isAnyTaskChecked } = this.props;

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
            <div>Add Task</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={AddTaskModalStyles.wrapper}>
            <div className={AddTaskModalStyles.item}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={this.handleChange}
                onKeyPress={this.onSubmit}
                value={this.state.title}
                disabled={isAnyTaskChecked}
                ref={this.inputRef}
                onSubmit={(e) => e.preventDefault()}
              />
              <textarea
                name="description"
                onChange={this.handleChange}
                className={AddTaskModalStyles.textarea}
                placeholder="Description"
                value={this.state.description}
                disabled={isAnyTaskChecked}
                onSubmit={(e) => e.preventDefault()}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <div className={AddTaskModalStyles.footer}>
          <button
            onClick={this.onSubmit}
            className={AddTaskModalStyles.btn1}
            disabled={
              isAnyTaskChecked || !this.state.title || !this.state.description
            }
          >
            Add
          </button>
          <button
            onClick={this.props.onHide}
            className={AddTaskModalStyles.btn2}
            disabled={
              isAnyTaskChecked || !this.state.title || !this.state.description
            }
          >
            Close
          </button>
        </div>
      </Modal>
    );
  }
}

AddTaskModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isAnyTaskChecked: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default AddTaskModal;
