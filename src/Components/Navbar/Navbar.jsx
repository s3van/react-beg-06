import React from "react";
import NavbarStyles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={NavbarStyles.nav}>
      <div className={NavbarStyles.item}>
        <NavLink to="/home" activeClassName={NavbarStyles.active} className={NavbarStyles.item} exact={true}>
          Home
        </NavLink>
      </div>
      <div className={NavbarStyles.item} className={NavbarStyles.item} >
        <NavLink to="/aboutus" activeClassName={NavbarStyles.active}  exact={true} >
          About Us
        </NavLink>
      </div>
      <div className={NavbarStyles.item} className={NavbarStyles.item}>
        <NavLink to="/contact" activeClassName={NavbarStyles.active}  exact={true}>
          Contact
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
