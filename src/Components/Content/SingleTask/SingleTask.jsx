import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import SingleTaskStyles from "./SingleTask.module.css";
import MainModal from "../Home/MainModal/MainModal";
import ErrorModal from "./ErrorModal/ErrorModal";
import SpinnerLoader from "../../../Utlis/SpinnerLoader/SpinnerLoader";
import {
  setSingleTaskDataThunk,
  editSingleTaskThunk,
  deleteSingleTaskThunk,
} from "../../../Redux/actions";

const SingleTask = (props) => {
  const {
    //singleTaskState
    singleTask,
    isEditModal,
    isErrorModal,
    loading,
    error,
    //functions
    //SYNC
    toggleSetOrRemoveErrorModal,
    toggleSetEditModal,
    //ASYNC
    setSingleTask,
    editTask,
    deleteTask,
  } = props;

  useEffect(() => {
    const { id } = props.match.params;
    setSingleTask(id);
  }, []);

  const handleEditSingleTask = (editableTask) => {
    editTask(editableTask);
  };

  const handleDeleteSingleTask = () => {
    const { history } = props;
    console.log("singletaskdata", singleTask);
    deleteTask(singleTask, history);
  };

  const handleGoBack = () => {
    props.history.go(-1);
  };

  return (
    <>
      {!singleTask && <SpinnerLoader />}
      {singleTask && singleTask !== error && (
        <div className={SingleTaskStyles.wrapper}>
          <div className={SingleTaskStyles.singleTaskTitleWrapper}>
            <h1>Single Task</h1>
          </div>
          <div className={SingleTaskStyles.singleTaskContentWrapper}>
            <div className={SingleTaskStyles.singleTaskContent}>
              <div>
                <div className={SingleTaskStyles.title}>
                  <div style={{ marginRight: "20px" }}>Title:</div>
                  <div className={SingleTaskStyles.titleText}>
                    {singleTask.title}
                  </div>
                </div>
                <div className={SingleTaskStyles.title}>
                  <div style={{ marginRight: "20px" }}>Description:</div>
                  <div className={SingleTaskStyles.descriptionText}>
                    {singleTask.description}
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: "10px", padding: "10px" }}>
                <button
                  className={SingleTaskStyles.deleteBtn}
                  onClick={handleDeleteSingleTask}
                >
                  Delete
                </button>
                <button
                  className={SingleTaskStyles.editBtn}
                  onClick={toggleSetEditModal}
                >
                  Edit
                </button>
                <button
                  className={SingleTaskStyles.gobackBtn}
                  onClick={handleGoBack}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isEditModal && (
        <MainModal
          onHide={toggleSetEditModal}
          onSubmit={handleEditSingleTask}
          editableTask={singleTask}
        />
      )}
      {isErrorModal && (
        <ErrorModal onHide={toggleSetOrRemoveErrorModal} error={error} />
      )}
      {loading && <SpinnerLoader />}
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    singleTask,
    isEditModal,
    isErrorModal,
    error,
  } = state.singleTaskState;

  return {
    loading: state.loading,
    singleTask,
    isEditModal,
    isErrorModal,
    error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOrRemoveLoading: (isloading) => {
      dispatch({ type: "SET_OR_REMOVE_LOADING", isloading });
    },
    toggleSetOrRemoveErrorModal: () => {
      dispatch({ type: "REMOVE_ERROR_MODAL" });
    },
    setErrorModal: (error) => {
      dispatch({ type: "SET_ERROR_MODAL", error });
    },
    toggleSetEditModal: () => {
      dispatch({ type: "SET_EDIT_MODAL" });
    },
    //ASYNC
    setSingleTask: (id) => {
      dispatch((dispatch) => setSingleTaskDataThunk(dispatch, id));
    },
    editTask: (editableTask) => {
      dispatch((dispatch) => editSingleTaskThunk(dispatch, editableTask));
    },
    deleteTask: (singleTask, history) => {
      dispatch((dispatch) =>
        deleteSingleTaskThunk(dispatch, singleTask, history)
      );
    },
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SingleTask);
