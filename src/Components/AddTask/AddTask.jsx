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

    handleSubmit3 = (event) => {
        if(event.keyCode === 13){
        this.props.handleSubmit(this.state.inputValue)
        this.setState({
            inputValue: ""
        })}
    }
    

    render() {
        return (
            <div className={AddTaskStyles.wrapper}>
                 <div>
                    <input 
                    type="text" 
                    placeholder="Add Task"
                    onChange={this.handleChange}
                    onKeyUp={this.handleSubmit3}
                    value={this.state.inputValue} 
                    />
                    <button 
                    onClick={this.handleSubmit2}
                    className={AddTaskStyles.btn}>
                    Add</button>
                </div> 
            </div>
        )
    }
}

export default AddTask
