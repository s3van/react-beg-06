import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SingleTaskStyles from "./SingleTask.module.css";
import MainModalRedux from "../Home/MainModal/MainModalRedux";
import ErrorModal from "../../../Utlis/ErrorModal/ErrorModal";
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
    editModal,
    errorModal,
    loading,
    backendError,
    //functions
    //SYNC
    setOrRemoveErrorModal,
    toggleSetEditModal,
    //ASYNC
    setSingleTask,
    editTask,
    deleteTask,
    reset,
  } = props;

  useEffect(() => {
    const { id } = props.match.params;
    setSingleTask(id);
    return () => {
      reset();
    };
  }, [setSingleTask, reset]);

  const handleEditSingleTask = (editableTask) => {
    editTask(editableTask);
  };

  const handleDeleteSingleTask = () => {
    const { history } = props;
    deleteTask(singleTask, history);
  };

  const handleGoBack = () => {
    props.history.go(-1);
  };

  const toggleSetOrRemoveErrorModal = () => {
    setOrRemoveErrorModal();
    props.history.go(-1);
  };

  return (
    <>
      <div className={SingleTaskStyles.singletask}>
        {singleTask && singleTask !== backendError && (
          <div className={SingleTaskStyles.wrapper}>
            <div className={SingleTaskStyles.descriptionWrap}>
              <div className={SingleTaskStyles.title}>
                <div className={SingleTaskStyles.infoTitle}>Title:</div>
                <div className={SingleTaskStyles.titleText}>
                  {singleTask.title}
                </div>
              </div>
              <div className={SingleTaskStyles.title}>
                <div className={SingleTaskStyles.infoTitle}>Description:</div>
                <div className={SingleTaskStyles.descriptionText}>
                  {singleTask.description}
                </div>
              </div>
            </div>
            <div className={SingleTaskStyles.buttonWrap}>
              <div className={SingleTaskStyles.btn}>
                <button
                  className={SingleTaskStyles.deleteBtn}
                  onClick={handleDeleteSingleTask}
                >
                  Delete
                </button>
              </div>
              <div className={SingleTaskStyles.btn}>
                <button
                  className={SingleTaskStyles.editBtn}
                  onClick={toggleSetEditModal}
                >
                  Edit
                </button>
              </div>
              <div className={SingleTaskStyles.btn}>
                <button
                  className={SingleTaskStyles.gobackBtn}
                  onClick={handleGoBack}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {editModal && (
        <MainModalRedux
          onHide={toggleSetEditModal}
          onSubmit={handleEditSingleTask}
          editableTask={singleTask}
        />
      )}
      {errorModal && (
        <ErrorModal
          onHide={toggleSetOrRemoveErrorModal}
          backendError={backendError}
        />
      )}
      {loading && <SpinnerLoader />}
    </>
  );
};

const mapStateToProps = (state) => {
  const { singleTask, editModal, backendError } = state.singletaskState;

  return {
    loading: state.globalState.loading,
    errorModal: state.globalState.errorModal,
    singleTask,
    editModal,
    backendError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //SYNC
    setOrRemoveLoading: (isloading) => {
      dispatch({ type: "SET_OR_REMOVE_LOADING", isloading });
    },
    setOrRemoveErrorModal: () => {
      dispatch({ type: "SET_OR_REMOVE_ERROR_MODAL" });
    },
    toggleSetEditModal: () => {
      dispatch({ type: "SET_OR_REMOVE_EDIT_MODAL" });
    },
    reset: () => {
      dispatch({ type: "RESET_SINGLETASK" });
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
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleTask)
);
