import React from "react";
import NavbarStyles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={NavbarStyles.nav}>
      <div className={NavbarStyles.item}>
      <NavLink to="/home" activeClassName={NavbarStyles.active}>Home</NavLink>
      </div>
      <div className={NavbarStyles.item}>
      <NavLink to="/aboutus" activeClassName={NavbarStyles.active}>About Us</NavLink>
      </div>
      <div className={NavbarStyles.item}>
      <NavLink to="/profile" activeClassName={NavbarStyles.active}>Profile</NavLink>
      </div>
    </nav>
    
  );
};

export default Navbar;
