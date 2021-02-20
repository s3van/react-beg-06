import React, { Component } from 'react'
import './App.css'
import Todo from './Components/Todo/Todo.jsx'



export default class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <Todo />
      </div>
    )
  }
}
