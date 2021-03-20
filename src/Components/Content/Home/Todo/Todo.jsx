import React, { PureComponent } from "react";
import Task from "../Task/Task";
import TodoStyles from "./Todo.module.css";
import { Container, Row, Col } from "react-bootstrap";
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";
import MainModal from "../MainModal/MainModal";

const API_HOST = "http://localhost:3001";

export class Todo extends React.PureComponent {
  state = {
    tasks: [],
    checkedTasks: new Set(),
    isOpenAddTaskModal: false,
    isOpenDeleteTaskModal: false,
    editableTask: null,
  };

  handleAddTask = (formData) => {
    fetch(`${API_HOST}/task`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        const tasks = [...this.state.tasks];
        tasks.push(data);
        this.setState({
          tasks: tasks,
        });
      })
      .catch((error) => {
        console.log("HandleAddTask", error);
      });
  };

  handleDeleteTask = (_id) => {
    fetch(`${API_HOST}/task/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        let tasks = [...this.state.tasks];
        tasks = tasks.filter((task) => task._id !== _id);
        this.setState({
          tasks: tasks,
        });
      })
      .catch((error) => {
        console.log("HandleDeleteTask-Error", error);
      });
  };

  handleEditTask = (editableTask) => {
    fetch(`${API_HOST}/task/${editableTask._id}`, {
      method: "PUT",
      body: JSON.stringify(editableTask),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        const tasks = [...this.state.tasks];
        const idx = tasks.findIndex((task) => task._id === editableTask._id);
        tasks[idx] = editableTask;
        this.setState({
          tasks: tasks,
        });
      })

      .catch((error) => {
        console.log("EDITABLETASK", error);
      });
  };

  handleCheckTask = (_id) => {
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

  handleDeleteTaskCheckedTasks = () => {
    const { checkedTasks } = this.state;
    fetch(`${API_HOST}/task`, {
      method: "PATCH",
      body: JSON.stringify({ tasks: Array.from(checkedTasks) }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        let tasks = [...this.state.tasks];
        tasks = tasks.filter((task) => !this.state.checkedTasks.has(task._id));
        this.setState({
          tasks: tasks,
          checkedTasks: new Set(),
        });
      })
      .catch((error) => {
        console.log("HANDLEDELETETaskCHECKEDTASKS", error);
      });
  };

  toggleCheckedAllTasks = () => {
    let checkedTasks = new Set(this.state.checkedTasks);
    if (this.state.tasks.length === this.state.checkedTasks.size) {
      checkedTasks.clear();
    } else {
      this.state.tasks.forEach((task) => {
        checkedTasks.add(task._id);
      });
    }
    this.setState({
      checkedTasks: checkedTasks,
    });
  };

  toggleOpenAddTaskModal = () => {
    this.setState({
      isOpenAddTaskModal: !this.state.isOpenAddTaskModal,
    });
  };

  toggleOpenDeleteTaskModal = () => {
    this.setState({
      isOpenDeleteTaskModal: !this.state.isOpenDeleteTaskModal,
    });
  };

  getTaskFromCheckedTasks = () => {
    let id = null;
    this.state.checkedTasks.forEach((_id) => {
      id = _id;
    });
    return this.state.tasks.find((task) => task._id === id);
  };

  toggleSetEditableTask = (editableTask = null) => {
    if (editableTask) {
      editableTask.date = new Date(editableTask.date);
    }
    this.setState({
      editableTask: editableTask,
    });
  };

  componentDidMount() {
    fetch(`${API_HOST}/task`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        this.setState({
          tasks: data,
        });
      })
      .catch((error) => {
        console.log("didmount", error);
      });
  }

  render() {
    const tasksJSX = this.state.tasks.map((task) => {
      return (
        <Col key={task._id} xs={12} sm={6} md={2} lg={3} className={TodoStyles.column}>
          <Task
            task={task}
            handleDeleteTask={this.handleDeleteTask}
            handleCheckTask={this.handleCheckTask}
            isAnyTaskChecked={!!this.state.checkedTasks.size}
            isChecked={!!this.state.checkedTasks.has(task._id)}
            toggleSetEditableTask={this.toggleSetEditableTask}
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
                className={TodoStyles.addBtn}
                disabled={!!this.state.checkedTasks.size}
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
          <Row className={TodoStyles.btnWrap}>
            <button
              className={TodoStyles.deleteCheckedBtn}
              onClick={this.toggleOpenDeleteTaskModal}
              disabled={!!!this.state.checkedTasks.size}
            >
              Delete Selected
            </button>
            <button
              className={TodoStyles.checkedAllTasksBtn}
              onClick={this.toggleCheckedAllTasks}
              disabled={!!!tasksJSX.length}
            >
              {this.state.tasks.length &&
              this.state.checkedTasks.size === this.state.tasks.length
                ? "Deselect"
                : "Select all"}
            </button>
          </Row>
        </Container>
        {this.state.isOpenDeleteTaskModal && (
          <DeleteTaskModal
            onHide={this.toggleOpenDeleteTaskModal}
            onSubmit={this.handleDeleteTaskCheckedTasks}
            checkedTasksCount={
              this.state.checkedTasks.size > 1
                ? this.state.checkedTasks.size
                : this.getTaskFromCheckedTasks()
            }
          />
        )}

        {this.state.isOpenAddTaskModal && (
          <MainModal
            onHide={this.toggleOpenAddTaskModal}
            onSubmit={this.handleAddTask}
          />
        )}
        {this.state.editableTask && (
          <MainModal
            onHide={this.toggleSetEditableTask}
            onSubmit={this.handleEditTask}
            editableTask={this.state.editableTask}
          />
        )}
      </>
    );
  }
}

export default Todo;
