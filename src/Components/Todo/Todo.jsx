import React, { Component } from "react";
import Task from "../Task/Task";
import AddTask from "../AddTask/AddTask";
import TodoStyles from "./Todo.module.css";
import { Container, Row, Col } from "react-bootstrap";

export class Todo extends React.Component {
  state = {
    tasks: ["Task 1", "Task 2", "Task 3", "Task 4"],
  };

  handleSubmit = (value) => {
    const tasks = [...this.state.tasks];
    tasks.push(value);
    this.setState(
      {
        tasks: tasks,
      }
    );
  };

  render() {
    const tasksJSX = this.state.tasks.map(function (task, index) {
      return <Col key={index} xs={12} sm={6} md={4} lg={3}>
      <Task task={task} />
      </Col>
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
            {tasksJSX}
        </Row>
      </Container>
    );
  }
}

export default Todo;
