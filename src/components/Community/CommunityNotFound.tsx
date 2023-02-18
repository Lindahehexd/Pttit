import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

const CommunityNotFound: React.FC = () => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" minHeight="60vh">
     抱歉，找不到此看板
      <Link href="/">
        <Button mt={4}>回到首頁</Button>
      </Link>
    </Flex>
  );
};
export default CommunityNotFound;
