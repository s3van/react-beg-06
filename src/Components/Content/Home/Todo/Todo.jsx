import { useEffect } from "react";
import Task from "../Task/Task";
import TodoStyles from "./Todo.module.css";
import { Container, Row, Col } from "react-bootstrap";
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";
import MainModal from "../MainModal/MainModal";
import SpinnerLoader from "../../../../Utlis/SpinnerLoader/SpinnerLoader";
import { connect } from "react-redux";
import {
  setTasksThunk,
  deleteOneTaskThunk,
  addTaskThunk,
  editTaskThunk,
  deleteTaskCheckedTasksThunk,
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
    //functions
    //SYNC
    toggleOpenAddTaskModal,
    toggleOpenDeleteTaskModal,
    handleCheckedTasks,
    handleCheckAllTasks,
    setEditTask,
    //ASYNC
    setTasks,
    addTask,
    deleteOneTask,
    editTask,
    deleteCheckedTasks,
  } = props;

  useEffect(() => {
    setTasks();
  }, []);

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
          handleDeleteTask={handleDeleteTask}
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
          onSubmit={handleDeleteTaskCheckedTasks}
          checkedTasksCount={
            oneCheckedTask ? oneCheckedTask : checkedTasks.size
          }
        />
      )}

      {isOpenAddTaskModal && (
        <MainModal onHide={toggleOpenAddTaskModal} onSubmit={handleAddTask} />
      )}
      {editableTask && (
        <MainModal
          onHide={setEditTask}
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
  } = state.todoState;
  return {
    tasks,
    checkedTasks,
    isOpenAddTaskModal,
    isOpenDeleteTaskModal,
    editableTask,
    oneCheckedTask,
    loading: state.loading,
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
    ////////////////////////////////////////////SYNC
    setOrRemoveLoading: (isloading) => {
      dispatch({ type: "SET_OR_REMOVE_LOADING", isloading });
    },
    handleCheckedTasks: (_id) => {
      dispatch({ type: "CHECK_TASKS", _id });
    },
    toggleOpenAddTaskModal: () => {
      dispatch({ type: "TOGGLE_OPEN_ADD_TASK_MODAL" });
    },
    toggleOpenDeleteTaskModal: () => {
      dispatch({ type: "TOGGLE_OPEN_DELETE_TASK_MODAL" });
    },
    setEditTask: (editableTask) => {
      dispatch({ type: "SET_EDIT_TASK", editableTask });
    },
    handleCheckAllTasks: () => {
      dispatch({ type: "CHECK_ALL_TASKS" });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
