import React from "react";
import { Box, Flex } from "@chakra-ui/react";

interface PageContentLayoutProps {
  maxWidth?: string;
  children: React.ReactElement | {};
}

// Assumes array of two children are passed
const PageContentLayout: React.FC<PageContentLayoutProps> = ({ children }) => {
  console.log(children);
  return (
    // background + center the contents inside
    <Flex
      // border="1px solid red"
      justify="center"
      p="16px 0px"
    >
      {/* Wrapper */}
      <Flex
        //   border="1px solid green"
        w="95%"
        maxW="860px"
        justify="center"
        p="2"
      >
        {/* L */}
        <Flex
          // border="1px solid yellow"
          direction="column"
          w={{ base: "100%", md: "65%" }}
          mr={{ base: "0", md: "6" }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* r */}
        <Flex
          //   border="1px solid orange"
          direction="column"
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageContentLayout;
