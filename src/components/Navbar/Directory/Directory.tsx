import useDirectory from "@/hooks/useDirectory";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Image, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";

const Directory = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();

  return (
    <Menu>
      <MenuButton
      h='100%'
        cursor="pointer"
        padding="0px 2px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.500" }}
        mx={3}
      >
        <Flex align="center">
          <Flex align="center">
            {/* {directoryState.selectedMenuItem.imageURL ? (
              <Image src={directoryState.selectedMenuItem.imageURL} borderRadius="full" boxSize="24px" mr={2} alt="" />
            ) : (
              <Icon
                fontSize="24"
                mr={{ base: 1, md: 2 }}
                as={directoryState.selectedMenuItem.icon}
                color={directoryState.selectedMenuItem.iconColor}
              />
            )} */}
            {/* <Icon fontSize="24" mr={{ base: 1, md: 2 }} as={TiHome} /> */}
            <Icon as={AiFillHeart} fontSize="20" color="pink.500" mr={1} />
            <Text fontSize="sm" display={{ base: "none", lg: "flex" }} fontWeight="bold">
              {/* Home will be dynamic  */}
              {/* {directoryState.selectedMenuItem.displayText} */}
              建立/收藏
            </Text>
          </Flex>
          <ChevronDownIcon ml={0} />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
        <MenuDivider />
      </MenuList>
    </Menu>
  );
};

export default Directory;
