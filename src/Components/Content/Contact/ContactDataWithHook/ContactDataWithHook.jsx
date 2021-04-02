import { useState, memo } from "react";
import { withRouter } from "react-router-dom";
import ContactDataWithHookStyles from "./ContactDataWithHook.module.css";
import SpinnerLoader from "../../../../Utlis/SpinnerLoader/SpinnerLoader";
import FieldModal from "./FieldModal/FieldModal";
import {
  fieldValidator,
  maxLengthValidator,
  minLengthValidator,
  emailValidator,
} from "../../../../Utlis/Validators/fieldValidator";

const API_HOST = "http://localhost:3001";
const maxlength30 = maxLengthValidator(200);
const minlength30 = minLengthValidator(2);

const ContactDataWithHook = (props) => {

  const [ContactData, setContactData] = useState({
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
  });

  const [SecondaryValues, setSecondaryValues] = useState({
    loading: false,
    fieldmodal: false,
    backendError: false,
    database: false,
  });

  const toggleFieldModal = () => {
    setSecondaryValues({
      fieldmodal: !SecondaryValues.fieldmodal,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let valid = true;
    let error =
      fieldValidator(value) ||
      maxlength30(value) ||
      minlength30(value) ||
      (name === "email" && emailValidator(value));
    if (error) {
      valid = false;
    }
    setContactData({
      ...ContactData,
      [name]: {
        valid: valid,
        error: error,
        value: value,
      },
    });
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
    setSecondaryValues({
      loading: true,
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
        setSecondaryValues({
          fieldmodal: data,
          database: data,
          loading: false,
        });
      })
      .catch((error) => {
        setSecondaryValues({
          fieldmodal: error,
          backendError: error,
          loading: false,
        });
      });
  };

  return (
    <>
      <div>
        <div className={ContactDataWithHookStyles.contactdata}>
          <div style={{ position: "absolute", top: "0", width: "100%" }}>
            <h1>Contact</h1>
          </div>
          <div className={ContactDataWithHookStyles.wrapper}>
            <div className={ContactDataWithHookStyles.inpt}>
              <div
                className={ContactDataWithHookStyles.textWrapper}
                style={{ width: "100%" }}
              >
                <div className={ContactDataWithHookStyles.formTitle}>
                  Feedback Form
                </div>
              </div>
            </div>
            <div className={ContactDataWithHookStyles.inpt}>
              <div className={ContactDataWithHookStyles.textWrapper}>
                <input
                  type="name"
                  name="name"
                  placeholder="Name"
                  value={ContactData.name.value.value}
                  onChange={handleChange}
                  className={ContactDataWithHookStyles.iteminput}
                />
                {ContactData.name.error && (
                  <div className={ContactDataWithHookStyles.validDiv}>
                    {ContactData.name.error}
                  </div>
                )}
                {!ContactData.name.error && ContactData.name.value && (
                  <div className={ContactDataWithHookStyles.validCheck}>
                    <span>&#x2714;</span>
                  </div>
                )}
              </div>
            </div>
            <div className={ContactDataWithHookStyles.inpt}>
              <div className={ContactDataWithHookStyles.textWrapper}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={ContactData.email.value}
                  onChange={handleChange}
                  className={ContactDataWithHookStyles.iteminput}
                />
                {ContactData.email.error && (
                  <div className={ContactDataWithHookStyles.validDiv}>
                    {ContactData.email.error}
                  </div>
                )}
                {!ContactData.email.error && ContactData.email.value && (
                  <div className={ContactDataWithHookStyles.validCheck}>
                    &#x2714;
                  </div>
                )}
              </div>
            </div>
            <div className={ContactDataWithHookStyles.inpt}>
              <div className={ContactDataWithHookStyles.textWrapper}>
                <textarea
                  type="message"
                  name="message"
                  placeholder="Message..."
                  value={ContactData.message.value}
                  onChange={handleChange}
                  className={ContactDataWithHookStyles.textarea}
                />
                {ContactData.message.error && (
                  <div className={ContactDataWithHookStyles.validDiv}>
                    {ContactData.message.error}
                  </div>
                )}
              </div>
            </div>
            <div className={ContactDataWithHookStyles.btnwrapp}>
              <div className={ContactDataWithHookStyles.textWrapper}>
                <button
                  onClick={handleSubmit}
                  className={ContactDataWithHookStyles.btn}
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
      {SecondaryValues.fieldmodal && (
        <FieldModal
          onHide={toggleFieldModal}
          fieldmodal={SecondaryValues.fieldmodal}
          backendError={SecondaryValues.backendError}
          database={SecondaryValues.database}
        />
      )}
      {SecondaryValues.loading && <SpinnerLoader />}
    </>
  );
};
export default withRouter(memo(ContactDataWithHook));
