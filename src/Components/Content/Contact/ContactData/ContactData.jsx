import React, { PureComponent } from "react";
import ContactDataStyles from "./ContactData.module.css";
import SpinnerLoader from "../../../../Utlis/SpinnerLoader/SpinnerLoader";
import FieldModal from "./FieldModal/FieldModal";
import {
  fieldValidator,
  maxLengthValidator,
  emailValidator,
} from "../../../../Utlis/Validators/fieldValidator";

const API_HOST = "http://localhost:3001";

const maxlength30 = maxLengthValidator(200);

class ContactData extends React.PureComponent {
  state = {
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
    fieldmodal: false,
    backendError: false,
    database: false,
  };

  toggleFieldModal = () => {
    this.setState({
      fieldmodal: !this.state.fieldmodal,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    let valid = true;
    let error =
      fieldValidator(value) ||
      maxlength30(value) ||
      (name === "email" && emailValidator(value));
    if (error) {
      valid = false;
    }
    this.setState({
      [name]: {
        valid: valid,
        error: error,
        value: value,
      },
    });
  };

  handleSubmit = () => {

    const formData = { ...this.state };
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
    this.setState({
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
        this.setState({
          fieldmodal: data,
          database: data,
          loading: false,
          value: "sad",
        });
        console.log(this.state.message)
      })
      .catch((error) => {
        this.setState({
          fieldmodal: error,
          backendError: error,
          loading: false,
        });
      });
  };

  render() {
    return (
      <>
        <div className={ContactDataStyles.contactdata}>
          <div style={{ position: "absolute", top: "0", width: "100%" }}>
            <h1>Contact</h1>
          </div>
          <div className={ContactDataStyles.wrapper}>
            <div className={ContactDataStyles.inpt}>
              <div
                className={ContactDataStyles.button}
                style={{ width: "100%" }}
              >
                <div className={ContactDataStyles.feed}>Feedback Form</div>
              </div>
            </div>
            <div className={ContactDataStyles.inpt}>
              <div className={ContactDataStyles.button}>
                <input
                  type="name"
                  name="name"
                  placeholder="Name"
                  value={this.state.name.value}
                  onChange={this.handleChange}
                  className={ContactDataStyles.iteminput}
                />
                {this.state.name.error && (
                  <div className={ContactDataStyles.validDiv}>
                    {this.state.name.error}
                  </div>
                )}
              </div>
            </div>
            <div className={ContactDataStyles.inpt}>
              <div className={ContactDataStyles.button}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email.value}
                  onChange={this.handleChange}
                  className={ContactDataStyles.iteminput}
                />
                {this.state.email.error && (
                  <div className={ContactDataStyles.validDiv}>
                    {this.state.email.error}
                  </div>
                )}
              </div>
            </div>
            <div className={ContactDataStyles.inpt}>
              <div className={ContactDataStyles.button}>
                <textarea
                  type="message"
                  name="message"
                  placeholder="Message..."
                  value={this.state.message.value}
                  onChange={this.handleChange}
                  className={ContactDataStyles.textarea}
                />
                {this.state.message.error && (
                  <div className={ContactDataStyles.validDiv}>
                    {this.state.message.error}
                  </div>
                )}
              </div>
            </div>
            <div className={ContactDataStyles.btnwrapp}>
              <div className={ContactDataStyles.button}>
                <button
                  onClick={this.handleSubmit}
                  className={ContactDataStyles.btn}
                  disabled={!this.state.message.value || !this.state.name.value || !this.state.email.value}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.state.fieldmodal && (
          <FieldModal
            onHide={this.toggleFieldModal}
            fieldmodal={this.state.fieldmodal}
            backendError={this.state.backendError}
            database={this.state.database}
          />
        )}
        {this.state.loading && <SpinnerLoader />}
      </>
    );
  }
}

export default ContactData;
