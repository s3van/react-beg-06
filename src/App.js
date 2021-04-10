import React, { Component } from 'react'
import './App.css'
import Navbar from "./Components/Navbar/Navbar";
import Content from "./Components/Content/Content";



export default class App extends Component {
  componentDidMount(){
    document.body.style.backgroundColor = "rgb(40,40,40)";
}
  render() {
    return (
      <div className="App">
        <Navbar />
        <Content />
      </div>

    )
  }
}
