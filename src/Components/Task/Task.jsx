import TaskStyles from "./Task.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import { memo } from "react";
import PropTypes from "prop-types";

function Task(props) {
  const {
    task,
    handleDelete,
    handleToggleCheck,
    isAnyTaskChecked,
    isChecked,
  } = props;

  const handleDeleteTask = () => {
    handleDelete(task._id);
  };

  const handleToggleCheckTask = () => {
    handleToggleCheck(task._id);
  };

  const cls = [TaskStyles.wrapper];
  if (isChecked) {
    cls.push(TaskStyles.checkedWrapper);
  }

  return (
    <Card className={cls.join(" ")}>
      <div className={TaskStyles.toolsWrapper}>
        <button
          className={TaskStyles.deleteBtn}
          onClick={handleDeleteTask}
          disabled={isAnyTaskChecked}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className={TaskStyles.editBtn} disabled={isAnyTaskChecked}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <input
          type="checkbox"
          className={TaskStyles.inpt}
          onChange={handleToggleCheckTask}
          checked={isChecked}
        />
      </div>
      <Card.Body>
        <Card.Title style={{ color: "#003049" }}>{task.title}</Card.Title>
      </Card.Body>
      <Card.Text className={TaskStyles.info}>{task.text}</Card.Text>
    </Card>
  );
}

Task.propTypes = {
  task: PropTypes.exact({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  handleDelete: PropTypes.func.isRequired,
  handleToggleCheck: PropTypes.func.isRequired,
  isAnyTaskChecked: PropTypes.bool,
  isChecked: PropTypes.bool,
};

export default memo(Task);
