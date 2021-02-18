import React, { Component } from 'react'
import "./App.css"
import AddNewTask from "./Lesson1/AddNewTask"


export default class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <AddNewTask />
      </div>
    )
  }
}
