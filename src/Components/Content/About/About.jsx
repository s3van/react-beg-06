import AboutStyles from "./About.module.css";

const AboutUs = (props) => {
  return (
    <div className={AboutStyles.aboutWrap}>
      <div className={AboutStyles.aboutTitle}>
        <h1 style={{ fontSize: "42px" }}>About</h1>
      </div>
      <div className={AboutStyles.about}>
        <div className={AboutStyles.myName}>
        <div>Sevan Yeritsyan</div>
        <div className={AboutStyles.myJob}>Junior React JS Developer</div>
        </div>
        
        <div className={AboutStyles.me}>
          I am 22 years old.Nuclear engineer by profession.Аlthough love my
          profession and the sphere of nuclear energy,i didn't want to work in
          this area.I saw myself in the IT,and follow this path.
        </div>
        <div className={AboutStyles.contactWithMe}>
          <div className={AboutStyles.getWithMe}>Get in Touch with Me </div>
          <div>Cell | +(374)-99-888-996 </div>
         <div> Gmail | sevanyeritsyan@gmail.com</div>
          <div>Portfolio | sevansportfolio01999.webflow.io</div>
          <div>LinkedIn | https://www.linkedin.com/in/sevan-yeritsyan-aa2b5620b/</div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
