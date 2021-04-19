import { memo, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import DateFormatter from "../../../../Utlis/DateFormatter/DateFormatter";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import MainModalStyles from "./MainModal.module.css";

const MainModalRedux = (props) => {
  const {
    //STATE
    title,
    description,
    date,
    //FUNCTIONS
    startdate,
    changeMainModal,
    startEdit,
    reset,
  } = props;

  const handleChange = (e) => {
    const { target } = e;
    changeMainModal(target);
  };

  const handleSubmitFormData = () => {
    const { editableTask } = props;
    if (editableTask) {
      const formData = {
        ...editableTask,
        title,
        description,
        date: DateFormatter(new Date(editableTask.date)),
      };
      console.log("uxarkvox", formData);
      props.onSubmit(formData);
    } else {
      const formData = {
        title,
        description,
        date: DateFormatter(new Date(date)),
      };
      props.onSubmit(formData);
    }
  };

  const setStartDate = (date) => {
    startdate(date);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    const { editableTask } = props;
    startEdit(editableTask);
    return () => {
      reset();
    };
  }, [inputRef, reset]);

  return (
    <Modal
      show={true}
      onHide={props.onHide}
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
          <div>{!props.editableTask ? "Add Task " : "Edit Task"}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={MainModalStyles.wrapper}>
          <div className={MainModalStyles.item}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              value={title}
              ref={inputRef}
              className={MainModalStyles.itemInput}
            />
            <textarea
              name="description"
              onChange={handleChange}
              className={MainModalStyles.textarea}
              placeholder="Description"
              value={description}
            ></textarea>
            <div className={MainModalStyles.datepickerWrapper}>
              <DatePicker
                selected={date}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <div className={MainModalStyles.footer}>
        <button
          onClick={handleSubmitFormData}
          className={MainModalStyles.btn1}
          disabled={!title || !description}
        >
          {props.editableTask ? "Save" : "Add"}
        </button>
        <button
          onClick={(event) => props.onHide()}
          className={MainModalStyles.btn2}
          disabled={!title || !description}
        >
          {!props.editableTask ? "Close" : "Cancel"}
        </button>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  const { title, description, date } = state.mainmodalState;

  return {
    title,
    description,
    date,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeMainModal: (target) => {
      dispatch({ type: "CHANGE", target });
    },
    startdate: (date) => {
      dispatch({ type: "START_DATE", date });
    },
    startEdit: (editableTask) => {
      dispatch({ type: "START_EDIT", editableTask });
    },
    reset: () => {
      dispatch({ type: "RESET_MAINMODAL" });
    },
  };
};
export default memo(
  connect(mapStateToProps, mapDispatchToProps)(MainModalRedux)
);
