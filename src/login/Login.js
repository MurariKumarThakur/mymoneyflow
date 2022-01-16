import React from "react";
import { NavLink } from "react-router-dom";
import "./login.css";

const Login = () => {
  return (
    <div className='LoginContainer'>
      <div className='login_container'>
        <div className='header'>Login To the MyMoneyFlow</div>
        <div className='username'>
          <label htmlFor=''>Username</label>
          <input tabIndex='1' type='text' />
        </div>
        <div className='password'>
          <label htmlFor=''>Password</label>

          <input type='text' />
        </div>

        <button>Login</button>
        <div className='signup_login'>
          <NavLink to='/signup'> Create New Account </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
