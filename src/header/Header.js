import React, { useEffect, useState } from "react";
import moment from "moment";
import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  let time_old = moment().format("MMMM Do YYYY, h:mm:ss a");
  const [time, setTime] = useState(time_old);
  const updateTime = () => {
    time_old = moment().format("MMMM Do YYYY, h:mm:ss a");
    setTime(time_old);
  };
  setInterval(updateTime, 1000);
  return (
    <div className='header_contaienr'>
      <div className='header_site_name'>My Money Flow</div>
      <div className='timeContainer'>{time}</div>

      <div className='userInfo'>
        <div className='username'>@Murari</div>
        <div className='loginLink'>
          <NavLink to='/login' activeClassName='activate'>
            SignIn
          </NavLink>
        </div>
        <div className='registrationLink'>
          <NavLink to='/signup' activeClassName='activate'>
            SignUp
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
