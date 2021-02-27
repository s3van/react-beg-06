import React, { Component } from "react";
import AddTaskStyles from "./AddTask.module.css";

export class AddTask extends Component {
  state = {
    inputValue: "",
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      inputValue: value,
    });
  };

  handleSubmit = ({key, type}) => {
    if (!this.state.inputValue || (type === "keypress" && key !== "Enter")) 
      return;
    this.props.handleSubmit(this.state.inputValue);
      this.setState({
        inputValue: "",
      });
  };

  render() {
    return (
      <div className={AddTaskStyles.wrapper}>
        <div className={AddTaskStyles.item}>
          <input
            type="text"
            placeholder="Add Task"
            onChange={this.handleChange}
            onKeyPress={this.handleSubmit}
            value={this.state.inputValue}
          />
          <button onClick={this.handleSubmit} className={AddTaskStyles.btn}>
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default AddTask;
