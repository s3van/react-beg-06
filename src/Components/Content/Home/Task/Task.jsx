import TaskStyles from "./Task.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import { memo } from "react";
import PropTypes from "prop-types";

function Task(props) {
  const {
    task,
    handleDeleteTask,
    handleCheckTask,
    isAnyTaskChecked,
    isChecked,
    toggleSetEditableTask,
  } = props;

  const handleDelete = () => {
    handleDeleteTask(task._id);

  };

  const handleCheck = () => {
    handleCheckTask(task._id);
  };

  const cls = [TaskStyles.wrapper];
  if (isChecked) {
    cls.push(TaskStyles.checkedWrapper);
  }
  
  return (
    <>
      <Card className={cls.join(" ")} style={{minWidth: "250px", maxWidth: "250px"}}>
        <div className={TaskStyles.toolsWrapper}>
          <button
            className={TaskStyles.deleteBtn}
            disabled={isAnyTaskChecked}
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button 
          className={TaskStyles.editBtn} 
          disabled={isAnyTaskChecked}
          onClick={() => toggleSetEditableTask(task)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <input
            type="checkbox"
            className={TaskStyles.inpt}
            onChange={handleCheck}
            checked={isChecked}
          />
        </div>
        <Card.Body>
          <Card.Title style={{ color: "#003049" }}>{task.title}</Card.Title>
        </Card.Body>
        <Card.Text className={TaskStyles.info}>
          <span>Description</span>
          {task.description}
         <span>
         Date:
          {task.date.slice(0,10)}
         </span>
        </Card.Text>
      </Card>
    </>
  );
}

Task.propTypes = {
  // task: PropTypes.exact({
  //   _id: PropTypes.string.isRequired,
  //   title: PropTypes.string.isRequired,
  //   description: PropTypes.string.isRequired,
  //   date: PropTypes.string.isRequired
  // }),
  handleDeleteTask: PropTypes.func.isRequired,
  handleCheckTask: PropTypes.func.isRequired,
  isAnyTaskChecked: PropTypes.bool.isRequired,
  isChecked: PropTypes.bool.isRequired,
  toggleSetEditableTask: PropTypes.func.isRequired,
};

export default memo(Task);
