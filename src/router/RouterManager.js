import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../home/Home";
import Login from "../login/Login";
import Header from "../header/Header";
import NavBar from "../navbar/NavBar";
import MutualFund from "../mutualFund/MutualFund";
import RiskMangment from "../riskmangment/RiskMangment";
import ShareMarket from "../sharemarket/ShareMarket";
import Interest from "../Interest/Interest";
import AlertMessage from "../alert/AlertMessage";

const RouterManager = () => {
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");

  const triggerAlert = (messageType, message) => {
    setMessageType(messageType);
    setMessage(message);
    setTimeout(() => {
      setMessageType("");
      setMessage("");
    }, 3000);
  };
  const user = "Murari";
  return (
    <div>
      <BrowserRouter>
        {messageType && message ? (
          <AlertMessage messageType={messageType} message={message} />
        ) : (
          ""
        )}

        {/* <Route path='/' component={Login} exact={true} /> */}
        <div>
          <Header />
          <NavBar />
          {/* <Route path='/login' component={Login} exact={true} /> */}
          <Route path='/'>
            <Interest showAlertMessage={triggerAlert} />
          </Route>
          {/* <Route path='/mutualfund' component={MutualFund} />
          <Route path='/sharemarket' component={ShareMarket} />
          <Route path='/riskmanagment' component={RiskMangment} /> */}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default RouterManager;
