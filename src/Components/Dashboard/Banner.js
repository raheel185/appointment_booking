import { Card, Flex, Typography } from "antd";
import React from "react";

const Banner = () => {
  return (
    <Card style={{ height:'100%', padding: "20px" }}>
      <Flex vertical gap={"30px"}>
        <Flex vertical align="flex-start">
          <Typography.Title level={2}>Welcome Back</Typography.Title>
          <Typography.Text type="secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            fugiat nobis beatae impedit! Quia modi facilis doloremque quidem.
            Maxime quo maiores dolor aliquid nulla eius, quae voluptatem
            distinctio repudiandae ullam.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            fugiat nobis beatae impedit! Quia modi facilis doloremque quidem.
            Maxime quo maiores dolor aliquid nulla eius, quae voluptatem
            distinctio repudiandae ullam.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            fugiat nobis beatae impedit! Quia modi facilis doloremque quidem.
            Maxime quo maiores dolor aliquid nulla eius, quae voluptatem
            distinctio repudiandae ullam.
          </Typography.Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Banner;
