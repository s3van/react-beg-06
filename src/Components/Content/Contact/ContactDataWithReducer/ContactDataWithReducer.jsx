import { withRouter } from "react-router-dom";
import ContactDataWithReducerStyles from "./ContactDataWithReducer.module.css";
import { useReducer } from "react";
import ContactModal from "../ContactModal/ContactModal";
import {
  fieldValidator,
  maxLengthValidator,
  minLengthValidator,
  emailValidator,
} from "../../../../Utlis/Validators/fieldValidator";
import SpinnerLoader from "../../../../Utlis/SpinnerLoader/SpinnerLoader";

const API_HOST = "http://localhost:3001";
const maxlength30 = maxLengthValidator(200);
const minlength30 = minLengthValidator(2);

const initialState = {
  ContactData: {
    name: {
      valid: false,
      error: null,
      value: "",
    },
    email: {
      valid: false,
      error: null,
      value: "",
    },
    message: {
      valid: false,
      error: null,
      value: "",
    },
    loading: false,
    contactModal: true,
    backendError: false,
    database: false,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "change": {
      const { target } = action;
      const { name, value } = target;
      let valid = true;
      let error =
        fieldValidator(value) ||
        maxlength30(value) ||
        minlength30(value) ||
        (name === "email" && emailValidator(value));
      if (error) {
        valid = false;
      }
      return {
        ...state,
        ContactData: {
          ...state.ContactData,
          [name]: {
            valid: valid,
            error: error,
            value: value,
          },
        },
      };
    }

    case "SET_CONTACT_DATA": {
      return {
        ContactData: {
          ...state.ContactData,
          name: {
            value: "",
          },
          email: {
            value: "",
          },
          message: {
            value: "",
          },
        },
      };
    }

    case "SET_LOADING": {
      return {
        ...state,
        loading: true,
      };
    }

    case "REMOVE_LOADING": {
      return {
        ...state,
        loading: false,
      };
    }

    case "SET_SECONDARY_VALUES_DATA": {
      return {
        ...state,
        contactModal: action.data,
        database: action.data,
      };
    }

    case "SET_SECONDARY_VALUES_ERROR": {
      return {
        ...state,
        contactModal: action.error,
        backendError: action.error,
      };
    }

    case "SET_CONTACTDATA_MODAL": {
      return {
        ...state,
        contactModal: !state.contactModal,
      };
    }

    default:
      return state;
  }
};

const ContactDataWithReducer = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { ContactData, contactModal, backendError, database, loading } = state;

  const toggleContactModal = () => {
    dispatch({ type: "SET_CONTACTDATA_MODAL" });
  };

  const handleChange = (e) => {
    const { target } = e;
    const action = {
      type: "change",
      target: target,
    };
    dispatch(action);
  };

  const handleSubmit = () => {
    const formData = { ...ContactData };
    for (let key in formData) {
      if (Object.keys(formData[key]).includes("value")) {
        formData[key] = formData[key].value;
      } else {
        delete formData[key];
      }
    }
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    )
      return;
    dispatch({
      type: "SET_LOADING",
    });
    fetch(`${API_HOST}/form`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        dispatch({ type: "REMOVE_LOADING" });
        dispatch({ type: "SET_CONTACT_DATA"});
        const action = {
          type: "SET_SECONDARY_VALUES_DATA",
          data: data,
        };
        dispatch(action);
      })
      .catch((error) => {
        console.log("ContactDataWithReducer Error", error);
        dispatch({ type: "REMOVE_LOADING" });
        dispatch({ type: "SET_CONTACT_ERROR", error });
        const action = {
          type: "SET_SECONDARY_VALUES_ERROR",
          error: error,
        };
        dispatch(action);
      });
  };

  return (
    <>
      <div>
        <div className={ContactDataWithReducerStyles.contactdata}>
          <div style={{ position: "absolute", top: "0", width: "100%" }}>
            <h1>Contact</h1>
          </div>
          <div className={ContactDataWithReducerStyles.wrapper}>
            <div className={ContactDataWithReducerStyles.inpt}>
              <div className={ContactDataWithReducerStyles.textWrapper}>
                <div className={ContactDataWithReducerStyles.formTitle}>
                  Feedback Form
                </div>
              </div>
            </div>
            <div className={ContactDataWithReducerStyles.inpt}>
              <div className={ContactDataWithReducerStyles.textWrapper}>
                <input
                  type="name"
                  name="name"
                  placeholder="Name"
                  value={ContactData.name.value}
                  onChange={handleChange}
                  className={ContactDataWithReducerStyles.iteminput}
                />
                {ContactData.name.error && (
                  <div className={ContactDataWithReducerStyles.validDiv}>
                    {ContactData.name.error}
                  </div>
                )}
                {!ContactData.name.error && ContactData.name.value && (
                  <div className={ContactDataWithReducerStyles.validCheck}>
                    <span>&#x2714;</span>
                  </div>
                )}
              </div>
            </div>
            <div className={ContactDataWithReducerStyles.inpt}>
              <div className={ContactDataWithReducerStyles.textWrapper}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={ContactData.email.value}
                  onChange={handleChange}
                  className={ContactDataWithReducerStyles.iteminput}
                />
                {ContactData.email.error && (
                  <div className={ContactDataWithReducerStyles.validDiv}>
                    {ContactData.email.error}
                  </div>
                )}
                {!ContactData.email.error && ContactData.email.value && (
                  <div className={ContactDataWithReducerStyles.validCheck}>
                    &#x2714;
                  </div>
                )}
              </div>
            </div>
            <div className={ContactDataWithReducerStyles.inpt}>
              <div className={ContactDataWithReducerStyles.textWrapper}>
                <textarea
                  type="message"
                  name="message"
                  placeholder="Your message..."
                  value={ContactData.message.value}
                  onChange={handleChange}
                  className={ContactDataWithReducerStyles.textarea}
                />
                {ContactData.message.error && (
                  <div className={ContactDataWithReducerStyles.validDiv}>
                    {ContactData.message.error}
                  </div>
                )}
              </div>
            </div>
            <div className={ContactDataWithReducerStyles.btnwrapp}>
              <div className={ContactDataWithReducerStyles.textWrapper}>
                <button
                  onClick={handleSubmit}
                  className={ContactDataWithReducerStyles.btn}
                  disabled={
                    ContactData.message.error ||
                    ContactData.name.error ||
                    ContactData.email.error ||
                    !ContactData.email.value ||
                    !ContactData.name.value ||
                    !ContactData.message.value
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
          ContactModal={contactModal}
          backendError={backendError}
          database={database}
        />
      )}
      {loading && <SpinnerLoader />}
    </>
  );
};
export default withRouter(ContactDataWithReducer);
