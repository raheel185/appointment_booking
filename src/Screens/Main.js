import React from "react";
import Tabbar from "../Components/Tabbar";
import { Outlet, useLocation } from "react-router-dom";
import "../Styles/Main.css";

function Main() {
  const location = useLocation();

  const hideTabbarPaths = ["/Login", "/Appointment", "/SignUp", "/ForgetPassword", "/Dashboard" ,"/AppointmentForm"];

  const shouldHideTabbar = hideTabbarPaths.includes(location.pathname);

  return (
    <div className="main-container">
      <div className="content-wrapper">
        {!shouldHideTabbar && <Tabbar />}
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
