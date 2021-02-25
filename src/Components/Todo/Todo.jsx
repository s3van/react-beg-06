import React, { Component } from 'react'
import Task from '../Task/Task'
import AddTask from '../AddTask/AddTask'
import TodoStyles from './Todo.module.css'

export class Todo extends React.Component {

    state = {
        tasks: ["Task 1", "Task 2", "Task 3"],
    }

    handleSubmit = (value) => {

        const tasks = [...this.state.tasks]
        tasks.push(value)
        this.setState({
            tasks: tasks,
        }, () => {
            //console.log("Tasks", this.state.tasks)
        }
        )

    }

    render() {
         
        const tasksJSX = this.state.tasks.map(function (task, index){
        return (
            <Task task={task} key={index}/>
        )
        })

        return (
            <div className={TodoStyles.wrapper} >
                <h1>Todo Component</h1>
                <AddTask handleSubmit={this.handleSubmit}/>
                <div className={TodoStyles.wrapper2}>
                    {tasksJSX}
                </div>
            </div>
        )
    }
}

export default Todo