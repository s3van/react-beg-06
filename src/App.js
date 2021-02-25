import React, { Component } from 'react'
import Todo from './Components/Todo/Todo'
import "./App.css"


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <h1><Todo /></h1>
        </div>
      </div>
    )
  }
}
