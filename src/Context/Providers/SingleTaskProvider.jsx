import { useState, useEffect } from "react";
import { SingleTaskContext } from "../context";

const API_HOST = "http://localhost:3001";

const SingleTaskProvider = (props) => {
  const [SingleTaskState, setSingleTaskState] = useState({
    singleTask: false,
    isEditModal: false,
    isErrorModal: false,
    loading: false,
    error: false,
  });

  useEffect(() => {
    const { id } = props.children.props.match.params;
    fetch(`${API_HOST}/task/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        setSingleTaskState({
          ...SingleTaskState,
          singleTask: data,
        });
      })
      .catch((error) => {
        console.log("singleTask Request", error);
        setSingleTaskState({
          ...SingleTaskState,
          singleTask: error,
          error: error,
          isErrorModal: !SingleTaskState.isErrorModal,
        });
      });
  }, []);

  const toggleSetErrorModal = () => {
    setSingleTaskState({
      ...SingleTaskState,
      isErrorModal: !SingleTaskState.isErrorModal,
    });
    props.children.props.history.push("/");
  };

  const toggleEditModal = () => {
    setSingleTaskState({
      ...SingleTaskState,
      isEditModal: !SingleTaskState.isEditModal,
    });
  };

  const handleGoBack = () => {
    props.children.props.history.go(-1);
  };

  const handleEditSingleTask = (editTask) => {
    setSingleTaskState({
      ...SingleTaskState,
      loading: true,
    });
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
        setSingleTaskState({
          ...SingleTaskState,
          singleTask: data,
          isEditModal: false,
        });
      })
      .catch((error) => {
        console.log("SingleTask-handleEditSingleTask Error", error);
        setSingleTaskState({
          ...SingleTaskState,
          loading: false,
          isEditModal: false,
          isErrorModal: error,
          singleTask: error,
          error: error,
        });
      });
  };

  const handleDeleteSingleTask = () => {
    setSingleTaskState({
      ...SingleTaskState,
      loading: true,
    });
    const { _id } = SingleTaskState.singleTask;
    fetch(`${API_HOST}/task/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        props.children.props.history.push("/");
      })
      .catch((error) => {
        console.log("SingleTask-handleDeleteSingleTask-Error", error);
      });
  };

  return (
    <SingleTaskContext.Provider
      value={{
        SingleTaskState: SingleTaskState,
        toggleSetErrorModal: toggleSetErrorModal,
        toggleEditModal: toggleEditModal,
        handleGoBack: handleGoBack,
        handleEditSingleTask: handleEditSingleTask,
        handleDeleteSingleTask: handleDeleteSingleTask,
      }}
    >
      {props.children}
    </SingleTaskContext.Provider>
  );
};
export default SingleTaskProvider;
