import React, { Component } from 'react'
import "./Global.css"

export class AddNewTask extends Component {

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
        const {handleSubmit} = this.props
        handleSubmit(this.state.inputValue)
        this.setState({inputValue: ""})
    }

    render() {
        return (
            <div>
                <h1>AddNewTask</h1>
                <div className="newtask-wrapper">
                    <input 
                    type="text" 
                    placeholder="Add Task"
                    onChange={this.handleChange}
                    value={this.state.inputValue}
                    className="input" />
                    
                    
                    <button className="button" 
                    onClick={this.handleSubmit2}
                    >Add</button>
                </div> 
            </div>
        )
    }
}

export default AddNewTask
