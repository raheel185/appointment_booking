import { Flex } from "antd";
import React from "react";
import BookNowCard from "../BookNowCard"
const SideContent = () => {
  return (
    <div style={{ width: 300 }}>
      <Flex vertical gap={"2.3rem"}><BookNowCard/></Flex>
    </div>
  );
};

export default SideContent;
