import React, { Component } from "react";
import Task from "../Task/Task";
import AddTask from "../AddTask/AddTask";
import TodoStyles from "./Todo.module.css";
import { Container, Row, Col } from "react-bootstrap";
import IdGenerator from "../../Utlis/IdGenerator";

export class Todo extends React.Component {
  state = {
    tasks: [
      { _id: IdGenerator(), title: "Task 1", text: "Info" },
      { _id: IdGenerator(), title: "Task 2", text: "Info" },
      { _id: IdGenerator(), title: "Task 3", text: "Info" },
      { _id: IdGenerator(), title: "Task4 ", text: "Info" },
    ],
  };

  handleSubmit = (value) => {
    const tasks = [...this.state.tasks];
    tasks.push({ text: "Info", title: value, _id: IdGenerator() });
    this.setState({
      tasks: tasks,
    });
  };

  handleDelete = (_id) => {
    let tasks = [...this.state.tasks];
    // const idx = tasks.findIndex(task => task._id === _id);
    // tasks.splice(idx,1)
    // this.setState(
    //   {
    //     tasks: tasks,
    //   }
    // );
    tasks = tasks.filter((task) => task._id !== _id);
    this.setState({
      tasks: tasks,
    });
  };

  render() {
    const tasksJSX = this.state.tasks.map((task) => {
      return (
        <Col key={task._id} xs={12} sm={6} md={4} lg={3}>
          <Task task={task} handleDelete={this.handleDelete} />
        </Col>
      );
    });

    return (
      <Container className={TodoStyles.wrapper}>
        <Row>
          <Col>
            <h1>Todo Component</h1>
            <AddTask handleSubmit={this.handleSubmit} />
          </Col>
        </Row>

        <Row>
          {tasksJSX.length ? tasksJSX : <p>No Tasks</p>}
        </Row>
      </Container>
    );
  }
}

export default Todo;
