import { Button, Layout, Menu } from "antd";
import React, { useState } from "react";
import Sidebar from "../Components/Dashboard/Sidebar";
import CustomHeader from "../Components/Dashboard/customHeader";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "../Styles/Appp.css";
import MainContent from "../Components/Dashboard/MainContent";
import Appointments from "../Components/Dashboard/Appointments";
import Logout from "../Components/Dashboard/Logout";
import Calendar from "../Components/Calender";
import CardList from "../Components/CardList";
import IntakeForm from "../Components/Dashboard/IntakeForm";
import { useMediaQuery, useTheme } from "@mui/material";
import InsuranceForm from "../Components/Dashboard/InsurranceForm";
import Consent from "../Components/Dashboard/Consent";

const { Sider, Header, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "1":
        return <MainContent />;
      case "2":
        return <Appointments />;
        case "3":
        return <InsuranceForm/>;
      case "4":
        return <CardList />;
      case "5":
        return <IntakeForm />;
      case "6":
        return <Consent />;
        case "7":
        return <Logout />;
      default:
        return <MainContent />;
    }
  };

  return (
    <Layout>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={isMobile ? true:collapsed}
        className="sider"
      >
        <Sidebar setSelectedMenuItem={setSelectedMenuItem} />
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => {
            if (!isMobile) setCollapsed(!collapsed);
          }}
          className="trigger-btn"
        />
      </Sider>
      <Layout>
        <Header className="headerr">
          <CustomHeader />
        </Header>
        <Content className="content">{renderContent()}</Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
