import styles from "./About.module.css";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
const About = () => {
  return (
    <div className={styles.aboutHolder}>
      <div>
        <Card>
          <Card.Body>
            <Card.Title>Sevan Yeritsyan</Card.Title>
            <Card.Text className={styles.userInfo}>
              I have successfully completed an React/Redux educational programm
              in Bitschool Business Development Group.
            </Card.Text>
            <hr className={styles.hr} />
          </Card.Body>
          <div className={styles.contactsUser}>
            <div className={styles.contactUser}>
              <FontAwesomeIcon icon={faEnvelope} />
              <address className={styles.address}>
                sevanyeritsyan@gmail.com
              </address>
            </div>
            <div className={styles.contactUser}>
              <FontAwesomeIcon icon={faPhone} />
              <address className={styles.address}>+374-99-888-996</address>
            </div>
            <div className={styles.contactUser}>
              <Card.Link href="https://github.com/s3van" target="_blank">
                <FontAwesomeIcon icon={faGithub} />
              </Card.Link>
              <address className={styles.address}>Github</address>
            </div>
            <div className={styles.contactUser}>
              <Card.Link
                href="https://www.linkedin.com/in/gev-margaryan-b5a571188/"
                target="_blank"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </Card.Link>
              <address className={styles.address}>LinkendIn</address>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default About;
