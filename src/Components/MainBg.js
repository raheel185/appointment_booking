import React from "react";
import "../Styles/Main_bg.css";
import "../styles2.css";
import bannerImg from "../assets/banner_img.jpg";
import calendarIcon from "../assets/schedule.png";
import checkIcon from "../assets/checked.png";
import bannerImg2 from "../assets/bannerImage2.svg";
import section2Img from "../assets/personImg.svg";

const MainBg = () => {
  return (
    <div class="home_div">
      <div class="container section1">
        <div class="banner_Container">
          <div class="content">
            <h1>Online Appointment Booking System for Medical Office</h1>
            <p>
              {" "}
              Simply define your services and providers, display their
              availability, and you will have clients both old and new making
              bookings 24/7.{" "}
            </p>
            <a class="main_button_link">Book Your Appointment</a>
          </div>
          <div class="bannerImage">
            <img src={bannerImg2} alt="Logo" />
          </div>
        </div>
      </div>
      <div class="container section2">
        <div class="banner_Container">
          <div class="bannerImage">
            <img src={section2Img} alt="Logo" />
          </div>
          <div class="content">
            <h1>How Our Booking System Works</h1>
            <p>
              {" "}
              Select your doctor, pick a convenient time, and confirm your
              appointment – all in a few clicks. Simple, fast, and hassle-free!{" "}
            </p>
            <ul class="icon_List">
              <li>
                <img src={calendarIcon} alt="Logo" />
                <span>Pick a Date and Time</span>
              </li>
              <li>
                <img src={checkIcon} alt="Logo" />
                <span>Confirm Your Appointment</span>
              </li>
            </ul>
            <a class="main_button_link">Get Started</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBg;
