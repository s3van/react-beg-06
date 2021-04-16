import ContactStyles from "./Contact.module.css";
import ContactData from "../Contact/ContactData/ContactData"

const Contact = (props) => {
  return (
    <div className={ContactStyles.contact}>
      <ContactData />
    </div>
  );
};

export default Contact;
