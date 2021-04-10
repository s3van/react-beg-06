import React, { PureComponent, createRef } from "react";
import { Modal } from "react-bootstrap";
import MainModalStyles from "./MainModal.module.css";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import DateFormatter from "../../../../Utlis/DateFormatter/DateFormatter";


class MainModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      title: "",
      description: "",
      ...props.editableTask,
      date: props.editableTask ? new Date(props.editableTask.date) : new Date(),
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmitFormData = () => {
    const formData = {
      ...this.state,
      date: DateFormatter(this.state.date),
    };
    this.props.onSubmit(formData);

  };

  setStartDate = (date) => {
    this.setState({
      date: date,
    });
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
                value={this.state.title}
                ref={this.inputRef}
                onSubmit={(e) => e.preventDefault()}
                className={MainModalStyles.itemInput}
              />
              <textarea
                name="description"
                onChange={this.handleChange}
                className={MainModalStyles.textarea}
                placeholder="Description"
                value={this.state.description}
                onSubmit={(e) => e.preventDefault()}
              ></textarea>
              <div className={MainModalStyles.datepickerWrapper}>
                <DatePicker
                  selected={this.state.date}
                  onChange={(date) => this.setStartDate(date)}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <div className={MainModalStyles.footer}>
          <button
            onClick={this.handleSubmitFormData}
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
  editableTask: PropTypes.object,
  onSubmit: PropTypes.func,
  onHide: PropTypes.func.isRequired,
};

export default MainModal;
