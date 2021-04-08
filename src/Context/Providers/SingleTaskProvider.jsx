import { useState, useEffect } from "react";
import { SingleTaskContext } from "../context";

const API_HOST = "http://localhost:3001";

const SingleTaskProvider = (props) => {

  const [SingleTaskState, setSingleTaskState] = useState({
    singleTask: null,
  });

  const [SecondaryValues, setSecondaryValues] = useState({
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
        });
        setSecondaryValues({
          ...SecondaryValues,
          error: error,
          isErrorModal: !SecondaryValues.isErrorModal,
        });
      });
  }, []);

  const toggleSetErrorModal = () => {
    setSecondaryValues({
      ...SecondaryValues,
      isErrorModal: !SecondaryValues.isErrorModal,
    });
    props.children.props.history.push("/");
  };

  const toggleSetEditModal = () => {
    setSecondaryValues({
      ...SecondaryValues,
      isEditModal: !SecondaryValues.isEditModal,
    });
  };

  const handleGoBack = () => {
    props.children.props.history.go(-1);
  };

  const handleEditSingleTask = (editTask) => {
    setSecondaryValues({
      ...SecondaryValues,
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
        });
        setSecondaryValues({
          ...SecondaryValues,
          isEditModal: false,
        });
      })
      .catch((error) => {
        console.log("SingleTask-handleEditSingleTask Error", error);
        setSingleTaskState({
          ...SingleTaskState,
        });
        setSecondaryValues({
          ...SecondaryValues,
          loading: false,
          isEditModal: false,
          isErrorModal: error,
          singleTask: error,
          error: error,
        });
        
      });
  };

  const handleDeleteSingleTask = () => {
    setSecondaryValues({
      ...SecondaryValues,
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
        SecondaryValues: SecondaryValues,
        toggleSetErrorModal: toggleSetErrorModal,
        toggleSetEditModal: toggleSetEditModal,
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
