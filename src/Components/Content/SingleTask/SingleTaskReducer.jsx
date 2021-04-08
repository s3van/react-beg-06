import { useReducer, useEffect } from "react";
import { withRouter } from "react-router-dom";
import SingleTaskReducerStyles from "./SingleTaskReducer.module.css";
import MainModal from "../Home/MainModal/MainModal";
import ErrorModal from "./ErrorModal/ErrorModal";
import SpinnerLoader from "../../../Utlis/SpinnerLoader/SpinnerLoader";

const API_HOST = "http://localhost:3001";

const initialState = {
  SingleTaskState: {
    singleTask: null,
    isEditModal: false,
    isErrorModal: false,
    loading: false,
    error: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SINGLETASK_DATA": {
      return {
        ...state,
        singleTask: action.data,
      };
    }

    case "SET_SINGLETASK_ERROR": {
      return {
        ...state,
        singleTask: action.error,
      };
    }

    case "SET_EDIT_MODAL": {
      return {
        ...state,
        isEditModal: true,
      };
    }

    case "REMOVE_EDIT_MODAL": {
      return {
        ...state,
        isEditModal: !state.isEditModal,
      };
    }

    case "SET_ERROR_MODAL": {
      return {
        ...state,
        isErrorModal: action.error,
      };
    }

    case "REMOVE_ERROR_MODAL": {
      return {
        ...state,
        isErrorModal: !state.isErrorModal,
      };
    }

    case "SET_ERROR": {
      return {
        ...state,
        error: action.error,
      };
    }

    case "SET_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }

    case "REMOVE_LOADING": {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
};

const SingleTaskReducer = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { singleTask, isEditModal, isErrorModal, loading, error } = state;

  useEffect(() => {
    const { id } = props.match.params;
    fetch(`${API_HOST}/task/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        dispatch({ type: "SET_SINGLETASK_DATA", data });
      })
      .catch((error) => {
        console.log("singleTask Request", error);
        const actiondata = {
          type: "SET_SINGLETASK_DATA",
          error: error,
        };
        const actionerror = {
          type: "SET_ERROR",
          error: error,
        };
        dispatch(actiondata);
        dispatch(actionerror);
        dispatch({ type: "REMOVE_ERROR_MODAL" });
      });
  }, []);

  const toggleSetErrorModal = () => {
    dispatch({ type: "REMOVE_ERROR_MODAL" });
    dispatch({ type: "SET_EDIT_MODAL" });
  };

  const toggleSetEditModal = () => {
    dispatch({ type: "REMOVE_EDIT_MODAL" });
  };

  const handleGoBack = () => {
    props.history.go(-1);
  };

  const handleEditSingleTask = (editTask) => {
    dispatch({ type: "SET_LOADING" });
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
        dispatch({ type: "SET_SINGLETASK_DATA", data });
        dispatch({ type: "REMOVE_EDIT_MODAL" });
        dispatch({ type: "REMOVE_LOADING" });
      })
      .catch((error) => {
        console.log("SingleTask-handleEditSingleTask Error", error);
        dispatch({ type: "REMOVE_LOADING" });
        dispatch({ type: "SET_ERROR", error });
        dispatch({ type: "SET_ERROR_MODAL", error });
        const action = {
          type: "SET_ERROR_MODAL",
          error: error,
        };
        dispatch(action);
      });
  };

  const handleDeleteSingleTask = () => {
    dispatch({ type: "SET_LOADING" });
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
        dispatch({ type: "REMOVE_LOADING" });
      });
  };

  return (
    <>
      {!singleTask && <SpinnerLoader />}
      {singleTask && singleTask !== error && (
        <div className={SingleTaskReducerStyles.wrapper}>
          <div className={SingleTaskReducerStyles.singleTaskTitleWrapper}>
            <h1>Single Task</h1>
          </div>
          <div className={SingleTaskReducerStyles.singleTaskContentWrapper}>
            <div className={SingleTaskReducerStyles.singleTaskContent}>
              <div>
                <div className={SingleTaskReducerStyles.title}>
                  <div style={{ marginRight: "20px" }}>Title:</div>
                  <div className={SingleTaskReducerStyles.titleText}>
                    {singleTask.title}
                  </div>
                </div>
                <div className={SingleTaskReducerStyles.title}>
                  <div style={{ marginRight: "20px" }}>Description:</div>
                  <div className={SingleTaskReducerStyles.descriptionText}>
                    {singleTask.description}
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: "10px", padding: "10px" }}>
                <button
                  className={SingleTaskReducerStyles.deleteBtn}
                  onClick={handleDeleteSingleTask}
                >
                  Delete
                </button>
                <button
                  className={SingleTaskReducerStyles.editBtn}
                  onClick={toggleSetEditModal}
                >
                  Edit
                </button>
                <button
                  className={SingleTaskReducerStyles.gobackBtn}
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
        <ErrorModal onHide={toggleSetErrorModal} error={error} />
      )}
      {loading && <SpinnerLoader />}
    </>
  );
};
export default withRouter(SingleTaskReducer);
