import { Flex, Menu, theme } from "antd";
import React from "react";
import {
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  CarryOutOutlined,
  FileAddOutlined,
  SignatureOutlined,
  InsuranceOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { FaLeaf } from "react-icons/fa6";
import { useMediaQuery, useTheme } from "@mui/material";
import { width } from "@mui/system";
import { is } from "date-fns/locale";

const Sidebar = ({ setSelectedMenuItem }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Flex align="center" justify="center" className="side">
        <div className="logoo">
          <FaLeaf />
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          className="menu-bar"
          onClick={({ key }) => setSelectedMenuItem(key)}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Profile",
            },
            {
              key: "2",
              icon: <CarryOutOutlined />,
              label: "My Appointments",
            },
            {
              key: "3",
              icon: <InsuranceOutlined />,
              label: "Insurance Form",
            },

            {
              key: "4",
              icon: <BookOutlined />,
              label: "Booking",
            },
            {
              key: "5",
              icon: <FileAddOutlined />,
              label: "Intake Form",
            },
            {
              key: "6",
              icon: <SignatureOutlined />,
              label: "Consent",
            },
            {
              key: "7",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
        />
      </Flex>
    </>
  );
};

export default Sidebar;
