import React, { PureComponent } from "react";
import Task from "../Task/Task";
import TodoStyles from "./Todo.module.css";
import { Container, Row, Col, Modal } from "react-bootstrap";
import IdGenerator from "../../Utlis/IdGenerator";
import AddTaskModal from "../AddTaskModal/AddTaskModal";

export class Todo extends React.PureComponent {
  state = {
    tasks: [
      { _id: IdGenerator(), title: "Task 1", description: "" },
      { _id: IdGenerator(), title: "Task 2", description: "" },
      { _id: IdGenerator(), title: "Task 3", description: "" },
      { _id: IdGenerator(), title: "Task 4", description: "" },
    ],
    checkedTasks: new Set(),
    isOpenAddTaskModal: false,
    isOpenTodoModal: false,
  };

  toggleOpenAddTaskModal = () => {
    this.setState({
      isOpenAddTaskModal: !this.state.isOpenAddTaskModal,
    });
  };

  toggleOpenTodoModal = () => {
    this.setState({
      isOpenTodoModal: !this.state.isOpenTodoModal,
    });
  };

  handleSubmit = (formData) => {
    let tasks = [...this.state.tasks];
    tasks.push({ ...formData, _id: IdGenerator() });
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
    this.toggleOpenTodoModal();
  };

  toggleCheckedAllTasks = () => {
    let checkedTasks = new Set(this.state.checkedTasks);
    if (this.state.tasks.length === this.state.checkedTasks.size) {
      checkedTasks.clear();
      console.log(checkedTasks);
    } else {
      this.state.tasks.forEach((task) => {
        checkedTasks.add(task._id);
        console.log(checkedTasks);
      });
    }
    this.setState({
      checkedTasks: checkedTasks,
    });
  };

  render() {
    const tasksJSX = this.state.tasks.map((task) => {
      return (
        <Col key={task._id} xs={12} sm={6} md={4} lg={3}>
          <Task
            task={task}
            handleDelete={this.handleDelete}
            handleToggleCheck={this.handleToggleCheck}
            isAnyTaskChecked={!!this.state.checkedTasks.size}
            isChecked={!!this.state.checkedTasks.has(task._id)}
          />
        </Col>
      );
    });

    return (
      <>
        <Container className={TodoStyles.wrapper}>
          <Row>
            <Col>
              <h1>Todo Component</h1>
              <button
                onClick={this.toggleOpenAddTaskModal}
                className={TodoStyles.setbtn}
              >
                Add Task
              </button>
            </Col>
          </Row>

          <Row>
            {tasksJSX.length ? (
              tasksJSX
            ) : (
              <p className={TodoStyles.ptux}>No Tasks</p>
            )}
          </Row>
          <Modal
            show={this.state.isOpenTodoModal}
            onHide={this.toggleOpenTodoModal}
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
                <div> Do you really want to delete ?</div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className={TodoStyles.footer}>
                <button
                  className={TodoStyles.btn1}
                  onClick={this.handleDeleteCheckedTasks}
                >
                  Delete
                </button>
                <button
                  className={TodoStyles.btn2}
                  onClick={this.toggleOpenTodoModal}
                >
                  Close
                </button>
              </div>
            </Modal.Body>
          </Modal>

          <Row className={TodoStyles.btnWrap}>
            <button
              className={TodoStyles.deleteCheckedBtn}
              onClick={this.toggleOpenTodoModal}
              disabled={!!!this.state.checkedTasks.size}
            >
              Delete Selected
            </button>

            <button
              className={TodoStyles.checkedAllTasksBtn}
              onClick={this.toggleCheckedAllTasks}
              disabled={!!!tasksJSX.length}
            >
              {this.state.checkedTasks.size === this.state.tasks.length
                ? "Remove All"
                : "Choose All"}
            </button>
          </Row>
        </Container>
        {this.state.isOpenAddTaskModal && (
          <AddTaskModal
            onHide={this.toggleOpenAddTaskModal}
            onSubmit={this.handleSubmit}
            isAnyTaskChecked={!!this.state.checkedTasks.size}
          />
        )}
      </>
    );
  }
}

export default Todo;
