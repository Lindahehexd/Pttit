import { useAuthState } from "react-firebase-hooks/auth";
import { defaultMenuItem } from "@/atoms/directoryMenuAtom";
import { auth } from "@/firebase/clientApp";
import { Flex, Image, Text } from "@chakra-ui/react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import Directory from "./Directory/Directory";
import useDirectory from "@/hooks/useDirectory";
import CurrentLocation from "./Directory/CurrentLocation";
import SwitchThemeButton from "./RightContent/SwitchThemeButton";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    <Flex bg="#0C0A66" height="44px" padding="6px 12px">
      {/* 如果直接跳頁 menu資訊不會改變 */}
      <Flex
        onClick={() => onSelectMenuItem(defaultMenuItem)}
        cursor="pointer"
        align="center"
        _hover={{ bg: "gray.500" }}
      >
        <Text color="yellow.300" fontWeight="bold" fontSize={{ base: "20px", md: "16px", lg: "20px" }}>
          PTTit
        </Text>
        <Text
        ml={2}
          color="yellow.300"
          fontWeight="bold"
          fontSize={{ base: "14px", md: "16px", lg: "20px" }}
          display={{ base: "none", md:'flex', lg: "flex" }}
        >
          類批踢踢實業坊
        </Text>
      </Flex>
      {user && <Directory />}
      <CurrentLocation />
      <SearchInput />
      <RightContent user={user} />
      {/* <SwitchThemeButton/> */}
    </Flex>
  );
};

export default Navbar;
