import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import SingleTaskStyles from "./SingleTask.module.css";
import MainModal from "../Home/MainModal/MainModal";
import ErrorModal from "./ErrorModal/ErrorModal";
import SpinnerLoader from "../../../Utlis/SpinnerLoader/SpinnerLoader";

const API_HOST = "http://localhost:3001";

const SingleTask = (props) => {
  const {
    //singleTaskState
    singleTask,
    isEditModal,
    isErrorModal,
    loading,
    error,
    //functions
    setSingleTask,
    setOrRemoveLoading,
    toggleSetOrRemoveErrorModal,
    setErrorModal,
    toggleSetEditModal,
  } = props;

  useEffect(() => {
    setOrRemoveLoading(true);
    const { id } = props.match.params;
    fetch(`${API_HOST}/task/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        console.log(data);
        setSingleTask(data);
      })
      .catch((error) => {
        console.log("singleTask Request", error);
        toggleSetOrRemoveErrorModal();
        setErrorModal(error);
      })
      .finally(() => {
        setOrRemoveLoading(false);
      });
  }, []);

  const handleGoBack = () => {
    props.history.go(-1);
  };

  const handleEditSingleTask = (editTask) => {
    setOrRemoveLoading(true);
    fetch(`${API_HOST}/task/${editTask._id}`, {
      method: "PUT",
      body: JSON.stringify(editTask),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        toggleSetEditModal();
        setSingleTask(data);
        setOrRemoveLoading(false);
      })
      .catch((error) => {
        console.log("SingleTask-handleEditSingleTask Error", error);
        setOrRemoveLoading(false);
        setErrorModal(error);
      });
  };

  const handleDeleteSingleTask = () => {
    props.setOrRemoveLoading(true);
    const { _id } = singleTask;
    fetch(`${API_HOST}/task/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        props.history.push("/");
      })
      .catch((error) => {
        console.log("SingleTask-handleDeleteSingleTask-Error", error);
        setOrRemoveLoading(false);
        setErrorModal(error);
      });
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
  return {
    loading: state.loading,
    singleTask: state.singleTaskState.singleTask,
    isEditModal: state.singleTaskState.isEditModal,
    isErrorModal: state.singleTaskState.isErrorModal,
    error: state.singleTaskState.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOrRemoveLoading: (isloading) => {
      dispatch({ type: "SET_OR_REMOVE_LOADING", isloading });
    },
    setSingleTask: (data) => {
      dispatch({ type: "SET_SINGLETASK_DATA", data });
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
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SingleTask);
