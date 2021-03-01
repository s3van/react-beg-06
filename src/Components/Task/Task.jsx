import TaskStyles from "./Task.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Card, Button } from "react-bootstrap";

const Task = (props) => {

  const { task, handleDelete } = props;

  const handleDeleteTask = () => {
    handleDelete(task._id)
  }

  // const handleCh = (_id) => {
  //   console.log("_id", task._id)
  // }

  return (
    <Card className={TaskStyles.wrapper}>
      <div className={TaskStyles.toolsWrapper}>
        <button className={TaskStyles.deleteBtn} onClick={handleDeleteTask}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className={TaskStyles.editBtn}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <input type="checkbox"  className={TaskStyles.inpt}/>
      </div>
      <Card.Body>
        <Card.Title style={{color: "#003049"}}>{task.title}</Card.Title>
      </Card.Body>
      <Card.Text className={TaskStyles.info}>{task.text}</Card.Text>
    </Card>
  );
};

export default Task;
