import React, { Component } from "react";
import AddTaskStyles from "./AddTask.module.css";

export class AddTask extends React.PureComponent {
  state = {
    inputValue: "",
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      inputValue: value,
    });
  };

  handleSubmit = (event) => {
    const { key } = event;
    const { type } = event;
    if (!this.state.inputValue || (type === "keypress" && key !== "Enter"))
      return;
    this.props.handleSubmit(this.state.inputValue);
    this.setState({
      inputValue: "",
    });
  };

  render() {
    const { isAnyTaskChecked } = this.props;

    return (
      <div className={AddTaskStyles.wrapper}>
        <div className={AddTaskStyles.item}>
          <input
            type="text"
            placeholder="Add Task"
            onChange={this.handleChange}
            onKeyPress={this.handleSubmit}
            value={this.state.inputValue}
            disabled={isAnyTaskChecked}
          />
          <button
            onClick={this.handleSubmit}
            className={AddTaskStyles.btn}
            disabled={isAnyTaskChecked}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default AddTask;
