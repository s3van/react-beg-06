import React, { PureComponent } from "react";
import SingleTaskStyles from "./SingleTask.module.css";
import MainModal from "../Home/MainModal/MainModal";
import SpinnerLoader from "../../SpinnerLoader/SpinnerLoader";
import ErrorModal from "../../ErrorModal/ErrorModal";

const API_HOST = "http://localhost:3001";

class SingleTask extends React.PureComponent {
  state = {
    singleTask: null,
    isEditModal: false,
    isErrorModal: false,
    loading: false,
    error: null,
  };

  toggleSetErrorModal = () => {
    this.setState({
      isErrorModal: !this.state.isErrorModal,
    });
    this.props.history.push("/");
  };

  toggleEditModal = () => {
    this.setState({
      isEditModal: !this.state.isEditModal,
    });
  };

  handleGoBack = () => {
    this.props.history.push("/");
  };

  handleEditSingleTask = (editTask) => {
    this.setState({
      loading: true,
      singleTask: editTask,
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
        this.setState({
          singleTask: data,
        });
      })
      .catch((error) => {
        console.log("SingleTask-handleEditSingleTask Error", error);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  handleDeleteSingleTask = () => {
    this.setState({
      loading: true,
    });
    const { _id } = this.state.singleTask;
    fetch(`${API_HOST}/task/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log("SingleTask-handleDeleteSingleTask-Error", error);
      });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`${API_HOST}/task/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        this.setState({
          singleTask: data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log("singleTask Request", error);
        this.setState({
          singleTask: error,
          error: error,
          isErrorModal: !this.state.isErrorModal,
          loading: false,
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    const {
      singleTask,
      isEditModal,
      isErrorModal,
      error,
      loading,
    } = this.state;
    if (!singleTask || loading) {
      return <SpinnerLoader />;
    }

    return (
      <>
        {isErrorModal && (
          <ErrorModal onHide={this.toggleSetErrorModal} error={error} />
        )}
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
                    onClick={this.handleDeleteSingleTask}
                  >
                    Delete
                  </button>
                  <button
                    className={SingleTaskStyles.editBtn}
                    onClick={this.toggleEditModal}
                  >
                    Edit
                  </button>
                  <button
                    className={SingleTaskStyles.gobackBtn}
                    onClick={this.handleGoBack}
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
            onHide={this.toggleEditModal}
            onSubmit={this.handleEditSingleTask}
            editableTask={singleTask}
          />
        )}
      </>
    );
  }
}

export default SingleTask;
