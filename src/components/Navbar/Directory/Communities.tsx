import CreateCommunityModal from "@/components/Modal/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";

const Communities = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <MenuItem w="100%" fontSize="sm" _hover={{ bg: "gray.500" }} onClick={() => setOpen(true)}>
        <Flex align="center">
          <Icon as={GrAdd} fontSize={20} mr={2} />
          <Flex> Create Community</Flex>
        </Flex>
      </MenuItem>
    </>
  );
};

export default Communities;
