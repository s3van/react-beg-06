import ContactStyles from "./Contact.module.css";
import ContactData from "./ContactData/ContactData";
import ContactDataWithHook from "./ContactDataWithHook/ContactDataWithHook"

const Contact = () => {

  return (
    <div className={ContactStyles.contact}>
      {/* <ContactData /> */}
      <ContactDataWithHook />
    </div>
  );
};

export default Contact;
