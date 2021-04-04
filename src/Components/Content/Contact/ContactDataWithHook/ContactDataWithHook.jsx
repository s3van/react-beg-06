import { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import ContactDataWithHookStyles from "./ContactDataWithHook.module.css";
import SpinnerLoader from "../../../../Utlis/SpinnerLoader/SpinnerLoader";
import ContactModal from "../ContactModal/ContactModal";
import {ContactDataContext} from "../../../../Context/context"

const ContactDataWithHook = (props) => {
  const Context = useContext(ContactDataContext);
  const {ContactData, SecondaryValues, handleChange, toggleContactModal, handleSubmit} = Context

  return (
    <>
     <div>
        <div className={ContactDataWithHookStyles.contactdata}>
          <div style={{ position: "absolute", top: "0", width: "100%" }}>
            <h1>Contact</h1>
          </div>
          <div className={ContactDataWithHookStyles.wrapper}>
            <div className={ContactDataWithHookStyles.inpt}>
              <div className={ContactDataWithHookStyles.textWrapper}>
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
                  value={ContactData.name.value}
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
                  placeholder="Your message..."
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
      {SecondaryValues.ContactModal && (
        <ContactModal
          onHide={toggleContactModal}
          ContactModal={SecondaryValues.ContactModal}
          backendError={SecondaryValues.backendError}
          database={SecondaryValues.database}
        />
      )}
      {SecondaryValues.loading && <SpinnerLoader />}
    </>
  );
};
export default withRouter(ContactDataWithHook);
