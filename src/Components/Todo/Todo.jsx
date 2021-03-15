import React, { PureComponent } from "react";
import Task from "../Task/Task";
import TodoStyles from "./Todo.module.css";
import { Container, Row, Col } from "react-bootstrap";
import IdGenerator from "../../Utlis/IdGenerator";
import AddTaskModal from "../AddTaskModal/AddTaskModal"
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";
import EditTaskModal from "../EditTaskModal/EditTaskModal"

export class Todo extends React.PureComponent {
  state = {
    tasks: [
      { _id: IdGenerator(), title: "Task 1", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, exercitationem?" },
      { _id: IdGenerator(), title: "Task 2", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, exercitationem?" },
      { _id: IdGenerator(), title: "Task 3", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, exercitationem?" },
      { _id: IdGenerator(), title: "Task 4", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, exercitationem?" },
    ],
    checkedTasks: new Set(),
    isOpenAddTaskModal: false,
    isOpenDeleteTaskModal: false,
    editableTask: null,
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

  getTaskFromCheckedTasks  = () => {
    let id = null;
    this.state.checkedTasks.forEach((_id) => {
      id = _id;
    });
    return (
      this.state.tasks.find((task) => 
      task._id === id
    )
    )
  }

  setEditableTask = (editTask) =>{
    this.setState({
      editableTask: editTask
    })
  }

  removEditableTask = () => {
    this.setState({
      editableTask: null
    })
  }

  handleEditTask = (editableTask) => {
    const tasks = [...this.state.tasks]
    const idx = tasks.findIndex((task) => task._id === editableTask._id)
    tasks[idx] = editableTask
    this.setState({
      tasks: tasks
    })
  }

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
            setEditableTask={this.setEditableTask}
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
                className={TodoStyles.setBtn}
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
              {this.state.tasks.length && this.state.checkedTasks.size === this.state.tasks.length
                ? "Remove All"
                : "CHoose All"}
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
         {this.state.isOpenDeleteTaskModal && (
          <DeleteTaskModal
            onHide={this.toggleOpenDeleteTaskModal}
            onSubmit={this.handleDeleteCheckedTasks}
            checkedTasksCount={this.state.checkedTasks.size > 1 ? this.state.checkedTasks.size : this.getTaskFromCheckedTasks()}
          />
        )}
        {this.state.editableTask && (
          <EditTaskModal 
          onHide={this.removEditableTask}
          editableTask={this.state.editableTask}
          onSubmit={this.handleEditTask}
          />
        )}
      </>
    );
  }
}

export default Todo;
