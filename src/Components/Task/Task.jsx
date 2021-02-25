import TaskStyles from './Task.module.css'

const Task = (props) => {
    const {task} = props
    return (
        <div className={TaskStyles.wrapper}>
            <p className={TaskStyles.p}>{task}</p>
            <button className={TaskStyles.btn1}>✓</button>
            <button className={TaskStyles.btn2}>✗</button>
            <div className={TaskStyles.info}><span className={TaskStyles.spanni}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem laudantium optio natus sunt expedita animi reiciendis assumenda dolore perferendis itaque</span></div>
        </div>
    )
}

export default Task