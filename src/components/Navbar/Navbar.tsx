import { Flex, Image } from "@chakra-ui/react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
const Navbar = () => {
  return (
    <Flex bg="gray.600" height="44px" padding="6px 12px">
      <Flex>
        <Image src='https://upload.wikimedia.org/wikipedia/commons/5/58/Reddit_logo_new.svg' alt="" />
      </Flex>


      <SearchInput/>
      <RightContent/>
    </Flex>

  );
};

export default Navbar;
