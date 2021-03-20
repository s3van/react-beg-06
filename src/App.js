import React, { Component } from 'react'
import './App.css'
import Navbar from "./Components/Navbar/Navbar";
import Content from "./Components/Content/Content";
import { BrowserRouter} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Navbar />
        <Content />
      </div>
      </BrowserRouter>
    )
  }
}
