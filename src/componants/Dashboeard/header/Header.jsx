import React, { useEffect, useState } from "react";
import "./header.css";
import Logo from "../../../pictures/logo.png";
import Avatar from "../../../pictures/avatar.png";
import Logout from "../../../pictures/logout.png";

import Dashboard from "../../../pictures/dashboard.png";
import Profile from "../../../pictures/profile.png";
import { useLocation } from "react-router-dom";

import Down from "../../../pictures/down_navbar.png";
const menu = document.querySelector(".menu");
const downMenu = document.querySelector(".down_menu");

function showDropdown() {
  var dropdown = document.querySelector(".down_menu");
  if (dropdown.style.display == "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
}
function logout_page() {
  localStorage.removeItem("userData");
}

function Header(props) {
  function change_page_profile() {
    props.updateState("profile");
  }
  return (
    <>
      <div className="header_">
        <div className="left">
          <div className="left_sigment">
            <img className="logo_img" src={Logo} />
          </div>
          <div className="left_sigment" id="not_phone">
            <img className="link_logo" src={Dashboard} />{" "}
            <a href="/dashboard">Dashboard</a>
          </div>
          <div className="left_sigment" id="not_phone">
            <img className="link_logo" src={Profile} />{" "}
            <a onClick={change_page_profile}>My Profile</a>
          </div>
        </div>
        <div className="right">
          {props.data && props.data.name && <p>{props.data.name}</p>}

          <img className="avatar_img" src={Avatar} />
          <div className="menu" onClick={showDropdown}>
            <img src={Down} className="down_img" tabIndex="0" />

            <div className="down_menu">
              <a className="profile" onClick={change_page_profile}>
                {" "}
                <img src={Profile} />
                Profile
              </a>
              <a href="/dashboard" className="Dach_menu">
                {" "}
                <img src={Dashboard} />
                Dashboard
              </a>
              <a href="/" className="Logout" onClick={logout_page}>
                {" "}
                <img src={Logout} className="Logout_img" />
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
