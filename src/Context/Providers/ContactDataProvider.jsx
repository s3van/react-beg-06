import { ContactDataContext } from "../context";
import { useState } from "react";
import {
  fieldValidator,
  maxLengthValidator,
  minLengthValidator,
  emailValidator,
} from "../../Utlis/Validators/fieldValidator";

const API_HOST = "http://localhost:3001";
const maxlength30 = maxLengthValidator(200);
const minlength30 = minLengthValidator(2);

const ContactDataProvider = (props) => {
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
    ContactModal: false,
    backendError: false,
    database: false,
  });

  const toggleContactModal = () => {
    setSecondaryValues({
      ContactModal: !SecondaryValues.ContactModal,
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
          ContactModal: data,
          database: data,
          loading: false,
        });
        setContactData({
          name: {
            value: "",
          },
          email: {
            value: "",
          },
          message: {
            value: "",
          },
        });
      })
      .catch((error) => {
        setSecondaryValues({
          ContactModal: error,
          backendError: error,
          loading: false,
        });
      });
  };
  return (
    <ContactDataContext.Provider
      value={{
        ContactData: ContactData,
        SecondaryValues: SecondaryValues,
        handleChange: handleChange,
        handleSubmit: handleSubmit,
        toggleContactModal: toggleContactModal,
      }}
    >
      {props.children}
    </ContactDataContext.Provider>
  );
};

export default ContactDataProvider;
