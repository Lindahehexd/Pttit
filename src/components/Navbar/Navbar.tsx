import { useAuthState } from "react-firebase-hooks/auth";
import { defaultMenuItem } from "@/atoms/directoryMenuAtom";
import { auth } from "@/firebase/clientApp";
import { Flex, Image, Text } from "@chakra-ui/react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import Directory from "./Directory/Directory";
import useDirectory from "@/hooks/useDirectory";
import CurrentLocation from "./Directory/CurrentLocation";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    <Flex bg="blue.900" height="44px" padding="6px 12px">
      {/* 如果直接跳頁 menu資訊不會改變 */}
      <Flex onClick={() => onSelectMenuItem(defaultMenuItem)} cursor="pointer" align='center' _hover={{bg:'gray.500'}}>
        <Text color="yellow.300"  fontWeight="bold" fontSize={{ base: "14px", md:'16px', lg: "20px" }}>
          Pttit 類批踢踢實業坊
        </Text>
      </Flex>
      {user && <Directory />}
      <CurrentLocation/ >
      <SearchInput />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
