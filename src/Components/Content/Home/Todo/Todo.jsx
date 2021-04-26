import { useEffect } from "react";
import Task from "../Task/Task";
import TodoStyles from "./Todo.module.css";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";
import MainModalRedux from "../MainModal/MainModalRedux";
import SpinnerLoader from "../../../../Utlis/SpinnerLoader/SpinnerLoader";
import ErrorModal from "../../../../Utlis/ErrorModal/ErrorModal";
import Search from "../Search/Search";
import { connect } from "react-redux";
import {
  setTasksThunk,
  deleteOneTaskThunk,
  addTaskThunk,
  editTaskThunk,
  deleteTaskCheckedTasksThunk,
  toggleTaskStatusThunk,
} from "../../../../Redux/actions";

const Todo = (props) => {
  const {
    //state
    tasks,
    loading,
    checkedTasks,
    isOpenAddTaskModal,
    isOpenDeleteTaskModal,
    editableTask,
    oneCheckedTask,
    errorModal,
    backendError,
    //functions
    //SYNC
    toggleOpenAddTaskModal,
    toggleOpenDeleteTaskModal,
    toggleCheckTask,
    toggleCheckAllTasks,
    toggleSetOrRemoveErrorModal,
    handleSetEditableTask,
    //ASYNC
    setTasks,
    addTask,
    deleteOneTask,
    editTask,
    deleteCheckedTasks,
    reset,
    toggleTaskStatus,
  } = props;

  useEffect(() => {
    setTasks();
    return () => {
      reset();
    };
  }, [setTasks, reset]);

  const handleAddTask = (formData) => {
    addTask(formData);
  };

  const handleDeleteTask = (_id) => {
    deleteOneTask(_id);
  };

  const handleEditTask = (editableTask) => {
    editTask(editableTask);
  };

  const handleDeleteTaskCheckedTasks = () => {
    deleteCheckedTasks(checkedTasks);
  };

  const taskStatus = (task) => {
    toggleTaskStatus(task);
  };

  const tasksJSX = tasks.map((task) => {
    return (
      
        <Task
          task={task}
          handleDeleteTask={handleDeleteTask}
          handleCheckTask={toggleCheckTask}
          isAnyTaskChecked={!!checkedTasks.size}
          isChecked={!!checkedTasks.has(task._id)}
          toggleSetEditableTask={handleSetEditableTask}
          taskStatus={taskStatus}
        />

    );
  });

  return (
    <>
      <Container className={TodoStyles.todo}>
        <Row className = {TodoStyles.toolsWrap}>
          <div className={TodoStyles.searchWrap}>
            <h1>Home</h1>
          </div>
          <div className={TodoStyles.searchWrap}>
          <Search />
          </div>
        </Row>
        <Row className={TodoStyles.btnWrap}>
              <div className={TodoStyles.btn}>
                <button
                  onClick={toggleOpenAddTaskModal}
                  className={TodoStyles.addBtn}
                  disabled={!!checkedTasks.size}
                >
                  Add Task
                </button>
              </div>

              <div className={TodoStyles.btn}>
                <button
                  className={TodoStyles.deleteCheckedBtn}
                  onClick={toggleOpenDeleteTaskModal}
                  disabled={!!!checkedTasks.size}
                >
                  Delete Selected
                </button>
              </div>

              <div className={TodoStyles.btn}>
                <button
                  className={TodoStyles.checkedAllTasksBtn}
                  onClick={toggleCheckAllTasks}
                  disabled={!!!tasksJSX.length}
                >
                  {tasks.length && checkedTasks.size === tasks.length
                    ? "Deselect"
                    : "Select all"}
                </button>
              </div>
        </Row>
        <Row>
          {tasksJSX.length ? (
            tasksJSX
          ) : (
            <p className={TodoStyles.ptux} style={{ marginTop: "270px" }}>
              No Tasks
            </p>
          )}
        </Row>
      </Container>
      {loading && <SpinnerLoader />}
      {isOpenDeleteTaskModal && (
        <DeleteTaskModal
          onHide={toggleOpenDeleteTaskModal}
          onSubmit={handleDeleteTaskCheckedTasks}
          checkedTasksCount={
            oneCheckedTask ? oneCheckedTask : checkedTasks.size
          }
        />
      )}
      {errorModal && (
        <ErrorModal
          onHide={toggleSetOrRemoveErrorModal}
          backendError={backendError}
        />
      )}
      {isOpenAddTaskModal && (
        <MainModalRedux
          onHide={toggleOpenAddTaskModal}
          onSubmit={handleAddTask}
        />
      )}
      {editableTask && (
        <MainModalRedux
          onHide={handleSetEditableTask}
          onSubmit={handleEditTask}
          editableTask={editableTask}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    tasks,
    checkedTasks,
    isOpenAddTaskModal,
    isOpenDeleteTaskModal,
    editableTask,
    oneCheckedTask,
    backendError,
  } = state.todoState;
  return {
    tasks,
    checkedTasks,
    isOpenAddTaskModal,
    isOpenDeleteTaskModal,
    editableTask,
    oneCheckedTask,
    backendError,
    loading: state.globalState.loading,
    errorModal: state.globalState.errorModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ////////////////////////////////////////////ASYNC
    setTasks: () => {
      dispatch(setTasksThunk);
    },
    deleteOneTask: (_id) => {
      dispatch((dispatch) => deleteOneTaskThunk(dispatch, _id));
    },
    addTask: (formData) => {
      dispatch((dispatch) => addTaskThunk(dispatch, formData));
    },
    editTask: (editableTask) => {
      dispatch((dispatch) => {
        editTaskThunk(dispatch, editableTask);
      });
    },
    deleteCheckedTasks: (checkedTasks) => {
      dispatch((dispatch) => {
        deleteTaskCheckedTasksThunk(dispatch, checkedTasks);
      });
    },
    toggleTaskStatus: (task) => {
      dispatch((dispatch) => {
        toggleTaskStatusThunk(dispatch, task);
      });
    },
    ////////////////////////////////////////////SYNC
    setOrRemoveLoading: (isloading) => {
      dispatch({ type: "SET_OR_REMOVE_LOADING", isloading });
    },
    toggleCheckTask: (_id) => {
      dispatch({ type: "CHECK_TASKS", _id });
    },
    toggleOpenAddTaskModal: () => {
      dispatch({ type: "TOGGLE_OPEN_ADD_TASK_MODAL" });
    },
    toggleOpenDeleteTaskModal: () => {
      dispatch({ type: "TOGGLE_OPEN_DELETE_TASK_MODAL" });
    },
    handleSetEditableTask: (editableTask) => {
      dispatch({ type: "SET_EDIT_TASK", editableTask });
    },
    toggleCheckAllTasks: () => {
      dispatch({ type: "CHECK_ALL_TASKS" });
    },
    toggleSetOrRemoveErrorModal: () => {
      dispatch({ type: "SET_OR_REMOVE_ERROR_MODAL" });
    },
    reset: () => {
      dispatch({ type: "RESET_TASK" });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
