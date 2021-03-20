import React from "react";
import ContentStyle from "./Content.module.css";
import Home from "./Home/Home"
import AboutUs from "./AboutUs/AboutUs"
import Profile from "./Profile/Profile"
import { Route } from "react-router-dom";

const Content = (props) => {

  return (
    <div className={ContentStyle.content}>
      <Route path="/home/" render={() => <Home />} />
      <Route path="/aboutus/" render={() => <AboutUs />} />
      <Route path="/profile/" render={() => <Profile />} />
    </div>
  );
};

export default Content;