import React, { Component } from "react";
import Task from "../Task/Task";
import AddTask from "../AddTask/AddTask";
import TodoStyles from "./Todo.module.css";
import { Container, Row, Col } from "react-bootstrap";
import IdGenerator from "../../Utlis/IdGenerator";

export class Todo extends React.PureComponent {
  state = {
    tasks: [
      { _id: IdGenerator(), title: "Task 1", text: "Info" },
      { _id: IdGenerator(), title: "Task 2", text: "Info" },
      { _id: IdGenerator(), title: "Task 3", text: "Info" },
      { _id: IdGenerator(), title: "Task 4", text: "Info" },
    ],
    checkedTasks: new Set(),
  };

  handleSubmit = (value) => {
    let tasks = [...this.state.tasks];
    tasks.push({ text: "Info", title: value, _id: IdGenerator() });
    this.setState({
      tasks: tasks,
    });
  };

  handleDelete = (_id) => {
    let tasks = [...this.state.tasks];
    tasks = tasks.filter((task) => task._id !== _id);
    this.setState({
      tasks: tasks,
    });
  };

  handleToggleCheck = (_id) => {
    let checkedTasks = new Set(this.state.checkedTasks);
    if (!checkedTasks.has(_id)) {
      checkedTasks.add(_id);
    } else {
      checkedTasks.delete(_id);
    }
    this.setState({
      checkedTasks: checkedTasks,
    });
  };

  handleDeleteCheckedTasks = () => {
    let tasks = [...this.state.tasks];
    tasks = tasks.filter((task) => !this.state.checkedTasks.has(task._id));
    this.setState({
      tasks: tasks,
      checkedTasks: new Set(),
    });
  };
//////////////////////////////////////////////////////////////////////////////////////////////////////
  handleCheckedAllTasks = () => {
    let checkedTasks = new Set(this.state.checkedTasks);
    const tasks = this.state.tasks.map((task) => {
      if (!checkedTasks.has(task._id)) {
        checkedTasks.add(task._id);
      } else {
        checkedTasks.delete(task._id);
      }
    })
    this.setState({
      checkedTasks: checkedTasks,
    });
  };
//////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    const tasksJSX = this.state.tasks.map((task) => {
      return (
        <Col key={task._id} xs={12} sm={6} md={4} lg={3}>
          <Task
            task={task}
            handleDelete={this.handleDelete}
            handleToggleCheck={this.handleToggleCheck}
            isAnyTaskChecked={!!this.state.checkedTasks.size}
            isChecked={this.state.checkedTasks.has(task._id)}
          />
        </Col>
      );
    });

    return (
      <Container className={TodoStyles.wrapper}>
        <Row>
          <Col>
            <h1>Todo Component</h1>
            <AddTask
              handleSubmit={this.handleSubmit}
              isAnyTaskChecked={!!this.state.checkedTasks.size}
            />
          </Col>
        </Row>

        <Row>
          {tasksJSX.length ? (
            tasksJSX
          ) : (
            <p className={TodoStyles.ptux}>No Tasks</p>
          )}
        </Row>
        <Row className={TodoStyles.btnWrap}>
          <button
            className={TodoStyles.deleteCheckedBtn}
            onClick={this.handleDeleteCheckedTasks}
            disabled={!!!this.state.checkedTasks.size}
          >
            Delete Selected
          </button>
          <button
            className={TodoStyles.checkedAllTasksBtn}
            onClick={this.handleCheckedAllTasks}
            disabled={!!!tasksJSX.length}
          >
            {!!!this.state.checkedTasks.size ? ("Choose All") :  ("Remove All")}
          </button>
        </Row>
      </Container>
    );
  }
}

export default Todo;
