import React, { Component } from 'react'
import AddTaskStyles from './AddTask.module.css'

export class AddTask extends Component {

    state = {
        inputValue: ""
    }

    handleChange = (event) => {
        const {value} = event.target
        this.setState({
            inputValue: value
        })
    }

    handleSubmit2 = () => {
        if(!this.state.inputValue)
        return
        this.props.handleSubmit(this.state.inputValue)
        this.setState({
            inputValue: ""
        })
    }

    render() {
        return (
            <div className={AddTaskStyles.wrapper}>
                <h1>Add Task</h1>
                 <div>
                    <input 
                    type="text" 
                    placeholder="Add Task"
                    onChange={this.handleChange}
                    value={this.state.inputValue} 
                    />
                    <button 
                    onClick={this.handleSubmit2}>
                    Add</button>
                </div> 
            </div>
        )
    }
}

export default AddTask
