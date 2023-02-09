import { auth } from "@/firebase/clientApp";
import { Button, Flex } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import AuthModal from "../../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";

type Props = {
  user: User | null | undefined;
};

const RightContent = ({user}: Props) => {


  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ?  <UserMenu user={user}/> : <AuthButtons />}
      </Flex>
    </>
  );
};

export default RightContent;
