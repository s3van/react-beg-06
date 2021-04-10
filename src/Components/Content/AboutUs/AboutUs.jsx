import AboutUsStyles from "./AboutUs.module.css";
import {connect} from "react-redux"

const AboutUs = (props) => {
    const {counter,plus,minus} = props
    return(
        <div className={AboutUsStyles.aboutus}>
            {/* <h1>About us</h1> */}
            <span>Counter: {counter}</span>
            <div>
                <button onClick={plus}>+</button>
                <button onClick={minus}>-</button>

            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    console.log(state);
    
    return{
        counter: state.counter
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        plus: ()=>{
            dispatch({type: "plus"})
        },
        minus: ()=>{
            dispatch({type: "minus"})
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AboutUs);