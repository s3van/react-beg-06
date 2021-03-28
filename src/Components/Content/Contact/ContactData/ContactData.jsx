import React, { PureComponent } from "react";
import ContactDataStyles from "./ContactData.module.css";
import SpinnerLoader from "../../../../Utlis/SpinnerLoader/SpinnerLoader";
import FieldModal from "./FieldModal/FieldModal";

const API_HOST = "http://localhost:3001";

class ContactData extends React.PureComponent {
  state = {
    name: "",
    email: "",
    message: "",
    loading: false,
    fieldmodal: false,
    error: null,
    database: null,
    empty: false,
  };

  toggleFieldModal = () => {
    this.setState({
      fieldmodal: !this.state.fieldmodal,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const formData = { ...this.state };
    delete formData.loading;
    delete formData.field;
    delete formData.error;
    delete formData.database;
    this.setState({
      loading: true,
    });
    if (
      this.state.name === "" ||
      this.state.email === "" ||
      this.state.message === ""
    ) {
      this.setState({
        fieldmodal: !this.state.empty,
        loading: false,
      });
    } else {
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
            name: "",
            email: "",
            message: "",
          });
          console.log("database", this.state.database);
        })
        .catch((error) => {
          console.log("ContactData-handleSubmit Error", error);
          this.setState({
            fieldmodal: error,
            error: error,
            loading: false,
          });
        });
    }
  };

  render() {
    return (
      <>
        {this.state.loading && <SpinnerLoader />}
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
                  value={this.state.name}
                  onChange={this.handleChange}
                  className={ContactDataStyles.iteminput}
                />
              </div>
            </div>
            <div className={ContactDataStyles.inpt}>
              <div className={ContactDataStyles.button}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  className={ContactDataStyles.iteminput}
                />
              </div>
            </div>
            <div className={ContactDataStyles.inpt}>
              <div className={ContactDataStyles.button}>
                <textarea
                  type="message"
                  name="message"
                  placeholder="Message..."
                  value={this.state.message}
                  onChange={this.handleChange}
                  className={ContactDataStyles.textarea}
                />
              </div>
            </div>
            <div className={ContactDataStyles.btnwrapp}>
              <div className={ContactDataStyles.button}>
                <button
                  onClick={this.handleSubmit}
                  className={ContactDataStyles.btn}
                >
                  <div className={ContactDataStyles.btntext}>Send</div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {this.state.fieldmodal && (
          <FieldModal
            onHide={this.toggleFieldModal}
            fieldmodal={this.state.fieldmodal}
            error={this.state.error}
            database={this.state.database}
            empty={this.state.empty}
          />
        )}
      </>
    );
  }
}

export default ContactData;
