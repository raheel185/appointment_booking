import React, { useState } from "react";
import "../Styles/Tabbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { MenuBook, MenuOpen, MenuRounded } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { MessageOutlined, UserOutlined } from "@ant-design/icons";
import "../Styles/Appp.css";

import { Avatar, Flex, Typography } from "antd";
function Tabbar() {
  const [show, setshow] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const nav = useNavigate();
  return (
    <header className="headerrr">
      <Link to={"/"} className="logo">
        pleo
      </Link>
      <button
        className="menu"
        onClick={() => {
          setshow(!show);
        }}
      >
        {!show ? <MenuRounded /> : <MenuOpen />}
      </button>
      {show && (
        <nav className="nav2">
          <a href="#services" className="item">
            Services
          </a>
          <a href="#address" className="item">
            Address
          </a>
          <a href="#review" className="item">
            Review
          </a>
        </nav>
      )}
      <nav className="nav">
        <a href="#services" className="item">
          Services
        </a>
        <a href="#address" className="item">
          Address
        </a>
        <a href="#review" className="item">
          Review
        </a>
      </nav>
      <div className="auth">
        {!user ? (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#040365" }}
            onClick={() => {
              nav("/Login");
            }}
          >
            Login
          </Button>
        ) : (
          <Flex align="flex-end" gap={"0.6rem"}>
            <Typography.Title level={5} type="secondary">
              {user.first_name}
            </Typography.Title>
            <Link to={"/Dashboard"}>
              <Avatar icon={<UserOutlined />} size="large" className="avatarr" />
            </Link>
          </Flex>
        )}
      </div>
    </header>
  );
}

export default Tabbar;
