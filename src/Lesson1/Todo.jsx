import React, { Component } from 'react'
import "./Todo.css"

export class Todo extends React.Component {

    state = {
        tasks: ["Task1", "Task2", "Task3"],
        inputValue: ""
    }

    handleChange = (event) => {
        const {value} = event.target
        this.setState({
            inputValue: value
        })
    }

    handleSubmit = () => {
        const tasks = [...this.state.tasks]
        tasks.push(this.state.inputValue)
        this.setState({
            tasks: tasks,
            inputValue: ""
        }
        )
    }

    render() {
        
        const tasksJSX = this.state.tasks.map(function (item, index){
        return <p key={index}>{item}</p>
        })
        return (
            <div>
                <h1>Todo Component</h1>
                <div>
                    <input 
                    type="text" 
                    placeholder="Add Task"
                    onChange={this.handleChange}
                    value={this.state.inputValue} />
                    
                    
                    <button 
                    onClick={this.handleSubmit
                    }>Add</button>
                </div>
                <div className="tasks-wrapper">
                    {tasksJSX}
                </div>
            </div>
        )
    }
}

export default Todo
