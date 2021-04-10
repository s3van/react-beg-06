import React, { PureComponent } from "react";
import NavbarStyles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

class Navbar extends React.PureComponent {
  navlinks = [
    { to: "/", exact: true, title: "Home" },
    { to: "/aboutus", exact: true, title: "About Us" },
    { to: "/contact", exact: true, title: "Contact" },
  ];

  render() {
    const navlinksJSX = this.navlinks.map((link, index) => {
      return (
        <NavLink
          to={link.to}
          activeClassName={NavbarStyles.active}
          exact={link.exact}
          key={index}
        >
          {link.title}
        </NavLink>
      );
    });

    return (
      <div className={NavbarStyles.nav}>
        <div className={NavbarStyles.item}>{navlinksJSX}</div>
        <div className={NavbarStyles.burger}>
            <div className={NavbarStyles.menuToggle}>
              <input type="checkbox" />
              <span></span>
              <span></span>
              <span></span>
              <div className={NavbarStyles.menu}>
                {navlinksJSX}
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
