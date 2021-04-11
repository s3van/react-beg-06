import TaskStyles from "./Task.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import { memo } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

const Task = (props) => {
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
      <Card
        className={cls.join(" ")}
        style={{ minWidth: "250px", maxWidth: "250px" }}
      >
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
          <Link
            to={`/task/${task._id}`}
            style={{textDecoration: "none", color: "#003049"}}
          >
            <Card.Title className={TaskStyles.link}>{task.title}</Card.Title>
          </Link>
        </Card.Body>
        <Card.Text className={TaskStyles.info}>
          <span>Description</span>
          {task.description}
          <span>
            Date:
            {task.date.slice(0, 10)}
          </span>
        </Card.Text>
      </Card>
    </>
  );
}

Task.propTypes = {
  handleDeleteTask: PropTypes.func,
  handleCheckTask: PropTypes.func.isRequired,
  isAnyTaskChecked: PropTypes.bool.isRequired,
  isChecked: PropTypes.bool.isRequired,
  toggleSetEditableTask: PropTypes.func.isRequired,
};

export default withRouter(memo(Task));
