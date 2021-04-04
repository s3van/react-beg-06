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
  // const [SingleTaskState, setSingleTaskState] = useState({
  //   singleTask: null,
  //   isEditModal: false,
  //   isErrorModal: false,
  //   loading: false,
  //   error: null,
  // });

  // const toggleSetErrorModal = () => {
  //   setSingleTaskState({
  //     ...SingleTaskState,
  //     isErrorModal: !SingleTaskState.isErrorModal,
  //   });
  //   props.history.push("/");
  // };

  // const toggleEditModal = () => {
  //   setSingleTaskState({
  //     ...SingleTaskState,
  //     isEditModal: !SingleTaskState.isEditModal,
  //   });
  // };

  // const handleGoBack = () => {
  //   props.history.go(-1);
  // };

  // const handleEditSingleTask = (editTask) => {
  //   setSingleTaskState({
  //     ...SingleTaskState,
  //     loading: true,
  //   });
  //   fetch(`${API_HOST}/task/${editTask._id}`, {
  //     method: "PUT",
  //     body: JSON.stringify(editTask),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.error) throw data.error;
  //       setSingleTaskState({
  //         ...SingleTaskState,
  //         singleTask: data,
  //         isEditModal: false,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("SingleTask-handleEditSingleTask Error", error);
  //     })
  //     .finally(() => {
  //       setSingleTaskState({
  //           ...SingleTaskState,
  //         loading: false,
  //         isEditModal: false,
  //       });
  //     });
  // };

  // const handleDeleteSingleTask = () => {
  //   setSingleTaskState({
  //     ...SingleTaskState,
  //     loading: true,
  //   });
  //   const { _id } = SingleTaskState.singleTask;
  //   fetch(`${API_HOST}/task/${_id}`, {
  //     method: "DELETE",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.error) {
  //         throw data.error;
  //       }
  //       props.history.push("/");
  //     })
  //     .catch((error) => {
  //       console.log("SingleTask-handleDeleteSingleTask-Error", error);
  //     });
  // };

  // useEffect(() => {
  //   const { id } = props.match.params;
  //   fetch(`${API_HOST}/task/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.error) {
  //         throw data.error;
  //       }
  //       console.log(data);
  //       setSingleTaskState({
  //         ...SingleTaskState,
  //         singleTask: data,
  //       });
  //       console.log("singleTask", singleTask);
  //     })
  //     .catch((error) => {
  //       console.log("singleTask Request", error);
  //       setSingleTaskState({
  //         ...SingleTaskState,
  //         singleTask: error,
  //         error: error,
  //         isErrorModal: !SingleTaskState.isErrorModal,
  //       });
  //     })
  //     .finally(() => {
  //       console.log("singleTask", singleTask);
  //     })
  // }, []);

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
