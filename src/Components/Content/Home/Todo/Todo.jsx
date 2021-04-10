import React, { PureComponent } from "react";
import Task from "../Task/Task";
import TodoStyles from "./Todo.module.css";
import { Container, Row, Col } from "react-bootstrap";
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";
import MainModal from "../MainModal/MainModal";
import SpinnerLoader from "../../../../Utlis/SpinnerLoader/SpinnerLoader";
import { connect } from "react-redux";

const API_HOST = "http://localhost:3001";

class Todo extends React.PureComponent {
  handleAddTask = (formData) => {
    this.props.setOrRemoveLoading(true);
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
        this.props.addTask(data);
      })
      .catch((error) => {
        console.log("Todo-handleAddTask Error", error);
      })
      .finally(() => {
        this.props.setOrRemoveLoading(false);
      });
  };

  handleDeleteTask = (_id) => {
    this.props.setOrRemoveLoading(true);
    fetch(`${API_HOST}/task/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;

        this.props.deleteOneTask(_id);
      })
      .catch((error) => {
        console.log("Todo-handleDeleteTask Error", error);
      })
      .finally(() => {
        this.props.setOrRemoveLoading(false);
      });
  };

  handleEditTask = (editableTask) => {
    this.props.setOrRemoveLoading(true);
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
        this.props.editTask(data);
      })
      .catch((error) => {
        console.log("Todo-handleEditTask Error", error);
      })
      .finally(() => {
        this.props.setOrRemoveLoading(false);
      });
  };

  handleDeleteTaskCheckedTasks = () => {
    this.props.setOrRemoveLoading(true);
    const { checkedTasks } = this.props;
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
        this.props.deleteCheckedTasks();
      })
      .catch((error) => {
        console.log("Todo-handleDeleteTaskCheckedTasks Error", error);
      })
      .finally(() => {
        this.props.setOrRemoveLoading(false);
      });
  };

  getTaskFromCheckedTasks = () => {
    let id = null;
    this.props.checkedTasks.forEach((_id) => {
      id = _id;
    });
    return this.props.tasks.find((task) => task._id === id);
  };

  componentDidMount() {
    this.props.setOrRemoveLoading(true);
    fetch(`${API_HOST}/task`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        this.props.setTasks(data);
      })
      .catch((error) => {
        console.log("Todo-componentDidMount Error", error);
      })
      .finally(() => {
        this.props.setOrRemoveLoading(false);
      });
  }

  render() {
    const {
      //state
      tasks,
      loading,
      checkedTasks,
      isOpenAddTaskModal,
      isOpenDeleteTaskModal,
      editableTask,

      //functions
      toggleOpenAddTaskModal,
      toggleOpenDeleteTaskModal,
      handleCheckedTasks,
      handleCheckAllTasks,
      setEditTask,
    } = this.props;

    const tasksJSX = tasks.map((task) => {
      return (
        <Col
          key={task._id}
          xs={12}
          sm={6}
          md={2}
          lg={3}
          className={TodoStyles.column}
        >
          <Task
            task={task}
            handleDeleteTask={this.handleDeleteTask}
            handleCheckTask={handleCheckedTasks}
            isAnyTaskChecked={!!checkedTasks.size}
            isChecked={!!checkedTasks.has(task._id)}
            toggleSetEditableTask={setEditTask}
          />
        </Col>
      );
    });

    return (
      <>
        <Container className={TodoStyles.todo}>
          <Row>
            <Col>
              <h1>Home</h1>
              <button
                onClick={toggleOpenAddTaskModal}
                className={TodoStyles.addBtn}
                disabled={!!checkedTasks.size}
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
            <div style={{ width: "140px", height: "30px" }}>
              <button
                className={TodoStyles.deleteCheckedBtn}
                onClick={toggleOpenDeleteTaskModal}
                disabled={!!!checkedTasks.size}
              >
                Delete Selected
              </button>
            </div>
            <div style={{ width: "140px", height: "30px" }}>
              <button
                className={TodoStyles.checkedAllTasksBtn}
                onClick={handleCheckAllTasks}
                disabled={!!!tasksJSX.length}
              >
                {tasks.length && checkedTasks.size === tasks.length
                  ? "Deselect"
                  : "Select all"}
              </button>
            </div>
          </Row>
        </Container>
        {loading && <SpinnerLoader />}
        {isOpenDeleteTaskModal && (
          <DeleteTaskModal
            onHide={toggleOpenDeleteTaskModal}
            onSubmit={this.handleDeleteTaskCheckedTasks}
            checkedTasksCount={
              checkedTasks.size > 1
                ? checkedTasks.size
                : this.getTaskFromCheckedTasks()
            }
          />
        )}

        {isOpenAddTaskModal && (
          <MainModal
            onHide={toggleOpenAddTaskModal}
            onSubmit={this.handleAddTask}
          />
        )}
        {editableTask && (
          <MainModal
            onHide={setEditTask}
            onSubmit={this.handleEditTask}
            editableTask={editableTask}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.todoState.tasks,
    checkedTasks: state.todoState.checkedTasks,
    isOpenAddTaskModal: state.todoState.isOpenAddTaskModal,
    isOpenDeleteTaskModal: state.todoState.isOpenDeleteTaskModal,
    loading: state.loading,
    editableTask: state.todoState.editableTask,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTasks: (data) => {
      dispatch({ type: "SET_TASKS", data });
    },
    deleteOneTask: (_id) => {
      dispatch({ type: "DELETE_ONE_TASK", _id });
    },
    setOrRemoveLoading: (isloading) => {
      dispatch({ type: "SET_OR_REMOVE_LOADING", isloading });
    },
    handleCheckedTasks: (_id) => {
      dispatch({ type: "CHECK_TASKS", _id });
    },
    toggleOpenAddTaskModal: () => {
      dispatch({ type: "TOGGLE_OPEN_ADD_TASK_MODAL" });
    },
    addTask: (data) => {
      dispatch({ type: "ADD_TASK", data });
    },
    toggleOpenDeleteTaskModal: () => {
      dispatch({ type: "TOGGLE_OPEN_DELETE_TASK_MODAL" });
    },
    editTask: (data) => {
      dispatch({ type: "EDIT_TASK", data });
    },
    setEditTask: (editableTask) => {
      dispatch({ type: "SET_EDIT_TASK", editableTask });
    },
    deleteCheckedTasks: () => {
      dispatch({ type: "DELETE_CHECKED_TASKS" });
    },
    handleCheckAllTasks: () => {
      dispatch({ type: "CHECK_ALL_TASKS" });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
