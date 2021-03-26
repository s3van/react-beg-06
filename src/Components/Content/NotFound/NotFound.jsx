import NotFoundStyles from "./NotFound.module.css";
import {memo} from "react"

const NotFound = (props) => {
    
return(
    <div style={{backgroundColor: "#e1f0c4" , width: "100%"}}>
        <div className={NotFoundStyles.notfound}>
            <div className={NotFoundStyles.notfound404}><h1>4<span>0</span>4</h1></div>
            <div className={NotFoundStyles.notfoundText}><p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p></div>
        </div>
    </div>
)
};

export default memo(NotFound);
