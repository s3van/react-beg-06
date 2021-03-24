import React, { PureComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import SingleTaskStyles from "./SingleTask.module.css"
import MainModal from "../Home/MainModal/MainModal"

const API_HOST = "http://localhost:3001";

class SingleTask extends React.PureComponent {
  state = {
    singleTask: null,
    isEditModal: false
  };

  toggleEditModal = () => {
    this.setState({
      isEditModal: !this.state.isEditModal,
    }); 
  }

  handleEditTask = (editTask) => {
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
        console.log("SingleTask-handleEditTask Error", error);
      });
  }

  handleDeleteSingleTask = () => {
    const {_id} = this.state.singleTask
    fetch(`${API_HOST}/task/${_id}`,{
      method: "DELETE",
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.error) throw data.error
      this.props.history.push("/")
    })
    .catch((error) => {
      console.log("SingleTask-handleDeleteSingleTask-Error", error);
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`${API_HOST}/task/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        this.setState({
          singleTask: data,
        }); 
      })
      .catch((error) => {
        console.log("singleTask Request", error);
        this.props.history.push("/")
      });
      
  }

  render() {
    const {singleTask, isEditModal} = this.state
    if (!singleTask) {
      return <p>"Loading..."</p>;
    }
    return (
      <>
      <div>
        <h1>Single Task</h1>
        <h2>{singleTask.title}</h2>
        <p>{singleTask.description}</p>
        <div>
        <button
            className={SingleTaskStyles.deleteBtn}
            // disabled={isAnyTaskChecked}
            onClick={this.handleDeleteSingleTask}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button
            className={SingleTaskStyles.editBtn}
            // disabled={isAnyTaskChecked}
           onClick={this.toggleEditModal}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
      </div>
      {
        isEditModal &&
        <MainModal 
        onHide={this.toggleEditModal}
        onSubmit={this.handleEditTask}
        editableTask={singleTask}/>
      }
      </>
    );
  }
}

export default SingleTask;
