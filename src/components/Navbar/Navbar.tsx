import { Flex, Image } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import UserMenu from "./RightContent/UserMenu";
import Directory from "./Directory/Directory";
const Navbar = () => {

  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex bg="gray.600" height="44px" padding="6px 12px">
      <Flex>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/5/58/Reddit_logo_new.svg" alt="" />
        </Flex>
      <Directory/>
      <SearchInput />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
