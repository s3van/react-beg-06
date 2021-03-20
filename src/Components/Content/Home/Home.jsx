import Todo from "./Todo/Todo";
import HomeStyles from "./Home.module.css"


const Home = () => {
    return(
        <div className={HomeStyles.home}>
            <Todo />
        </div>
    )
}

export default Home