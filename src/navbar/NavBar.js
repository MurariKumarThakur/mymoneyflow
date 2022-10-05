import React from "react";
import "./nav.css";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <div className='navbar'>
      <NavLink to='/interest'activeClassName="activate" >Interest</NavLink>
      <NavLink to='/sharemarket' activeClassName="activate">Share Market</NavLink>
      <NavLink to='/mutualfund' activeClassName="activate">Mutual Fund</NavLink>
      <NavLink to='/riskmanagment' activeClassName="activate">Risk Management Calculator</NavLink>
    </div>
  );
};

export default NavBar;
