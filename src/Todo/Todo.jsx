import React, { Component } from 'react'
import AddNewTask from './AddNewTask'

export class Todo extends Component {

    state = {
        inputValue: ""
    }

    handleSubmit = (value) => {
        console.log("Result", value)
    }
    

    render() {
        return (
            <div>
                <AddNewTask handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default Todo
