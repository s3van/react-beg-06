import NotFoundStyles from "./NotFound.module.css";
import { memo } from "react";

const NotFound = (props) => {
    
  const { history } = props;
  
  const handleGoBack = () => {
    history.push("/");
  };

  return (
    <div className={NotFoundStyles.notfound}>
      <div className={NotFoundStyles.wrapper}>
        <div className={NotFoundStyles.notfound404}>
          <h1>
            4<span>0</span>4
          </h1>
        </div>
        <div className={NotFoundStyles.notfoundText}>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
        </div>
        <div>
          <button onClick={handleGoBack} className={NotFoundStyles.btn}>
            Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(NotFound);
