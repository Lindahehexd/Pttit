import { useAuthState } from "react-firebase-hooks/auth";
import { defaultMenuItem } from "@/atoms/directoryMenuAtom";
import { auth } from "@/firebase/clientApp";
import { Flex, Image } from "@chakra-ui/react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import Directory from "./Directory/Directory";
import useDirectory from "@/hooks/useDirectory";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    <Flex bg="gray.600" height="44px" padding="6px 12px">
      {/* 如果直接跳頁 menu資訊不會改變 */}
      <Flex onClick={() => onSelectMenuItem(defaultMenuItem)} cursor="pointer">
        <Image src="https://upload.wikimedia.org/wikipedia/commons/5/58/Reddit_logo_new.svg" alt="" />
      </Flex>
      <Directory />
      <SearchInput />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
