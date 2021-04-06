import { useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import SingleTaskHookStyles from "./SingleTaskHook.module.css";
import MainModal from "../Home/MainModal/MainModal";
import SpinnerLoader from "../../../Utlis/SpinnerLoader/SpinnerLoader";
import ErrorModal from "./ErrorModal/ErrorModal";
import {SingleTaskContext} from "../../../Context/context"

const SingleTaskHook = (props) => {
  const Context = useContext(SingleTaskContext);
  const {
    SingleTaskState,  
    toggleSetErrorModal, 
    toggleEditModal, 
    handleGoBack, 
    handleEditSingleTask,
    handleDeleteSingleTask} = Context

  const {
    singleTask,
    isEditModal,
    isErrorModal,
    error,
    loading,
  } = SingleTaskState
  return (
    <>
      {!singleTask && <SpinnerLoader />}
      {isErrorModal && (
        <ErrorModal onHide={toggleSetErrorModal} error={error} />
      )}
      {singleTask && singleTask !== error && (
        <div className={SingleTaskHookStyles.wrapper}>
          <div className={SingleTaskHookStyles.singleTaskTitleWrapper}>
            <h1>Single Task</h1>
          </div>
          <div className={SingleTaskHookStyles.singleTaskContentWrapper}>
            <div className={SingleTaskHookStyles.singleTaskContent}>
              <div>
                <div className={SingleTaskHookStyles.title}>
                  <div style={{ marginRight: "20px" }}>Title:</div>
                  <div className={SingleTaskHookStyles.titleText}>
                    {singleTask.title}
                  </div>
                </div>
                <div className={SingleTaskHookStyles.title}>
                  <div style={{ marginRight: "20px" }}>Description:</div>
                  <div className={SingleTaskHookStyles.descriptionText}>
                    {singleTask.description}
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: "10px", padding: "10px" }}>
                <button
                  className={SingleTaskHookStyles.deleteBtn}
                  onClick={handleDeleteSingleTask}
                >
                  Delete
                </button>
                <button
                  className={SingleTaskHookStyles.editBtn}
                  onClick={toggleEditModal}
                >
                  Edit
                </button>
                <button
                  className={SingleTaskHookStyles.gobackBtn}
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
          onHide={toggleEditModal}
          onSubmit={handleEditSingleTask}
          editableTask={singleTask}
        />
      )}
       {loading && <SpinnerLoader />}
    </>
  );
};
export default withRouter(SingleTaskHook);
