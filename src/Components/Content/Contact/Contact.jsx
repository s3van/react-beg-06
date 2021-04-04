import ContactStyles from "./Contact.module.css";
import ContactData from "./ContactData/ContactData";
import ContactDataWithHook from "./ContactDataWithHook/ContactDataWithHook";
import ContactDataProvider from "../../../Context/Providers/ContactDataProvider";

const Contact = (props) => {
  return (
    <div className={ContactStyles.contact}>
      {/* <ContactData /> */}
      <ContactDataProvider>
        <ContactDataWithHook />
      </ContactDataProvider>
    </div>
  );
};

export default Contact;
