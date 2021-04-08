import ContactStyles from "./Contact.module.css";
// import ContactDataWithHook from "./ContactDataWithHook/ContactDataWithHook";
import ContactDataWithReducer from "./ContactDataWithReducer/ContactDataWithReducer"

const Contact = (props) => {
  return (
    <div className={ContactStyles.contact}>
      {/* <ContactDataWithHook /> */}
      <ContactDataWithReducer />
    </div>
  );
};

export default Contact;
