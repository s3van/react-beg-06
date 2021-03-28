import ContactStyles from "./Contact.module.css";
import ContactData from "./ContactData/ContactData";

const Contact = () => {

  return (
    <div className={ContactStyles.contact}>
      <ContactData />
    </div>
  );
};

export default Contact;
