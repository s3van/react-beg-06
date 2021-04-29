import { connect } from "react-redux";
import { handleSubmitContactDataThunk } from "../../../../Redux/actions";
import ContactModal from "../ContactModal/ContactModal";
import SpinnerLoader from "../../../../Utlis/SpinnerLoader/SpinnerLoader";
import ContactDataStyles from "./ContactData.module.css";

const ContactData = (props) => {
  const {
    //STATE
    name,
    email,
    message,
    loading,
    contactModal,
    backendError,
    database,
    //functions
    //ASYNC
    submitContactData,
    //SYNC
    changeContactData,
    toggleSetContactModal,
  } = props;

  const toggleContactModal = () => {
    toggleSetContactModal();
  };

  const handleChange = (e) => {
    const { target } = e;
    changeContactData(target);
  };

  const handleSubmit = () => {
    const formData = { message, email, name };
    submitContactData(formData);
  };
  return (
    <>
      <div>
        <div className={ContactDataStyles.contactdata}>
          <div style={{ position: "absolute", top: "0", width: "100%" }}>
            <h1>Contact</h1>
          </div>
          <div className={ContactDataStyles.wrapper}>
            <div className={ContactDataStyles.inpt}>
              <div className={ContactDataStyles.textWrapper}>
                <div className={ContactDataStyles.formTitle}>Feedback Form</div>
              </div>
            </div>
            <div className={ContactDataStyles.inpt}>
              <div className={ContactDataStyles.textWrapper}>
                <input
                  type="name"
                  name="name"
                  placeholder="Name"
                  value={name.value}
                  onChange={handleChange}
                  className={ContactDataStyles.iteminput}
                />
                {name.error && (
                  <div className={ContactDataStyles.validDiv}>{name.error}</div>
                )}
                {!name.error && name.value && (
                  <div className={ContactDataStyles.validCheck}>
                    <span>&#x2714;</span>
                  </div>
                )}
              </div>
            </div>
            <div className={ContactDataStyles.inpt}>
              <div className={ContactDataStyles.textWrapper}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email.value}
                  onChange={handleChange}
                  className={ContactDataStyles.iteminput}
                />
                {email.error && (
                  <div className={ContactDataStyles.validDiv}>
                    {email.error}
                  </div>
                )}
                {!email.error && email.value && (
                  <div className={ContactDataStyles.validCheck}>&#x2714;</div>
                )}
              </div>
            </div>
            <div className={ContactDataStyles.inpt}>
              <div className={ContactDataStyles.textWrapper}>
                <textarea
                  type="message"
                  name="message"
                  placeholder="Your message..."
                  value={message.value}
                  onChange={handleChange}
                  className={ContactDataStyles.textarea}
                />
                {message.error && (
                  <div className={ContactDataStyles.validDiv}>
                    {message.error}
                  </div>
                )}
              </div>
            </div>
            <div className={ContactDataStyles.btnwrapp}>
              <div className={ContactDataStyles.textWrapper}>
                <button
                  onClick={handleSubmit}
                  className={ContactDataStyles.btn}
                  disabled={
                    message.error ||
                    name.error ||
                    email.error ||
                    !email.value ||
                    !name.value ||
                    !message.value
                  }
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {contactModal && (
        <ContactModal
          onHide={toggleContactModal}
          contactModal={contactModal}
          backendError={backendError}
          database={database}
        />
      )}
      {loading && <SpinnerLoader />}
    </>
  );
};
const mapStateToProps = (state) => {
  const {
    name,
    email,
    message,
    contactModal,
    backendError,
    database,
  } = state.contactdataState;

  return {
    name,
    email,
    message,
    contactModal,
    backendError,
    database,
    loading: state.globalState.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //SYNC
    setOrRemoveLoading: (isloading) => {
      dispatch({ type: "SET_OR_REMOVE_LOADING", isloading });
    },
    changeContactData: (target) => {
      dispatch({ type: "CHANGE_CONTACTDATA", target });
    },
    toggleSetContactModal: () => {
      dispatch({ type: "SET_OR_REMOVE_CONTACTDATA_MODAL" });
    },
    //ASYNC
    submitContactData: (formData) => {
      dispatch((dispatch) => handleSubmitContactDataThunk(dispatch, formData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
