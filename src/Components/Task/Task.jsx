import TaskStyles from './Task.module.css'

const Task = (props) => {
    const {task} = props
    return (
        <div className={TaskStyles.wrapper}>
            <p>{task}</p>
            <button>&times;</button>
        </div>
    )
}

export default Task