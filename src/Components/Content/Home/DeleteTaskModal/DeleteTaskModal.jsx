import DeleteTaskModalStyles from "./DeleteTaskModal.module.css";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const DeleteTaskModal = (props) => {
  const { onHide, onSubmit, checkedTasksCount } = props;

  const handleDeleteTask = () => {
    onSubmit();
    onHide();
  };
  return (
    <Modal
      show={true}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div>
            {" "}
            Do you really want to delete{" "}
            {!!checkedTasksCount.title
              ? checkedTasksCount.title + " " + "?"
              : checkedTasksCount + " Tasks ?"}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={DeleteTaskModalStyles.footer}>
          <button
            className={DeleteTaskModalStyles.btn1}
            onClick={handleDeleteTask}
          >
            Delete
          </button>
          <button className={DeleteTaskModalStyles.btn2} onClick={onHide}>
            Close
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

DeleteTaskModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  checkedTasksCount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  onHide: PropTypes.func.isRequired,
};

export default DeleteTaskModal;
