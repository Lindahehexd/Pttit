import { signOut, User } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import { Menu, MenuButton, MenuList, MenuItem, Button, Box, Flex, Icon, Text, MenuDivider } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaRedditSquare, FaSnowman } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import { useResetRecoilState } from "recoil";
import { communityState } from "@/atoms/communitiesAtom";

type MenuProps = {
  user: User | null | undefined;
};

const UserMenu = ({ user }: MenuProps) => {
  //after finish joined components parts
  //   const resetCommunity = useResetRecoilState(communityState);

  const logout = async () => {
    await signOut(auth);
    // resetCommunity();
  };

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <>
                <Icon fontSize={24} mr={1} color="gray.300" as={FaSnowman} />
                <Text fontWeight={700}>{user?.displayName || user?.email?.split("@")[0]}</Text>
              </>
            ) : (
              <Icon fontSize={24} mr={1} color="gray.400" as={VscAccount} />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {/* <MenuItem _hover={{ bg: "blue.500", color: "white" }}>
          <Flex align="center" fontWeight="bold">
            <Icon as={CgProfile} fontSize={20} mr={2} />
          </Flex>
          Profile
        </MenuItem> */}
        {/* <MenuDivider /> */}
        <MenuItem _hover={{ bg: "blue.500", color: "white" }} onClick={logout}>
          <Flex align="center" fontWeight="bold">
            <Icon as={MdOutlineLogout} fontSize={20} mr={2} />
          </Flex>
          登出
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
