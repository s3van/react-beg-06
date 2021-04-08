import React, { PureComponent } from "react";
import ContentStyle from "./Content.module.css";
//Pages
import Home from "./Home/Home";
import AboutUs from "./AboutUs/AboutUs";
import Contact from "./Contact/Contact";
import NotFound from "./NotFound/NotFound";
import SingleTaskReducer from "./SingleTask/SingleTaskReducer";
//Routing
import { Route, Redirect, Switch } from "react-router-dom";
//Providers
import SingleTaskProvider from "../../Context/Providers/SingleTaskProvider";
import ContactDataProvider from "../../Context/Providers/ContactDataProvider";

class Content extends React.PureComponent {
  pages = [
    { path: "/", component: Home, exact: true },
    { path: "/aboutus", component: AboutUs, exact: true },
    { path: "/contact", component: Contact, exact: true },
    { path: "/task/:id", component: SingleTaskReducer, exact: true },
    { path: "/notfound", component: NotFound, exact: true },
  ];

  render() {
    const pagesJSX = this.pages.map((page, index) => {
      // if (index === 3) {
      //   return (
      //     <Route
      //       path={page.path}
      //       render={(props) => (
      //         <SingleTaskProvider>
      //           <page.component {...props} />
      //         </SingleTaskProvider>
      //       )}
      //       exact={page.exact}
      //       key={index}
      //     />
      //   );
      // } 
      // else if (index === 2) {
      //   return (
      //     <Route
      //       path={page.path}
      //       render={(props) => (
      //         <ContactDataProvider>
      //           <page.component {...props} />
      //         </ContactDataProvider>
      //       )}
      //       exact={page.exact}
      //       key={index}
      //     />
      //   );
      // }
      return (
        <Route
          path={page.path}
          component={page.component}
          exact={page.exact}
          key={index}
        />
      );
    });
    return (
      <div className={ContentStyle.content}>
        <Switch>
          {pagesJSX}
          <Redirect to="/notfound" />
        </Switch>
      </div>
    );
  }
}

export default Content;
