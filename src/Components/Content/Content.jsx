import React from "react";
import ContentStyle from "./Content.module.css";
import Home from "./Home/Home"
import AboutUs from "./AboutUs/AboutUs"
import Contact from "./Contact/Contact"
import { Route, Switch, Redirect } from "react-router-dom";

const Content = (props) => {

  return (
    <div className={ContentStyle.content}>
      <Switch>
      <Route path="/home/" component={Home} exact/>
      <Route path="/aboutus/" component={AboutUs} exact/>
      <Route path="/contact/" component={Contact} exact/>
      <Redirect to="/home" />
      </Switch>
    </div>
  );
};

export default Content;