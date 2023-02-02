import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";

const Directory = () => {
  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        mx={2}
      >
        <Flex align="center" justify="space-between" w={{ base: "auto", lg: "150px" }}>
          <Flex align="center">
            <Icon fontSize="24" mr={{ base: 1, md: 2 }} as={TiHome} />
            <Text fontSize="sm" display={{ base: "none", lg: "flex" }} fontWeight="bold">
              Home
            </Text>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {/* <MenuItem _hover={{ bg: "blue.500", color: "white" }}>
          <Flex align="center" fontWeight="bold">
            <Icon as={CgProfile} fontSize={20} mr={2} />
          </Flex>
        </MenuItem> */}
          <Communities/>
        <MenuDivider />
      </MenuList>
    </Menu>
  );
};

export default Directory;
