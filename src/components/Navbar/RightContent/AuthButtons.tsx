import { authModalState } from "@/atoms/authModalAtom";
import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import SwitchThemeButton from "./SwitchThemeButton";

const AuthButtons = () => {
  // only when writing the states
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <>
      <Button
        variant="outline"
        h="28px"
        display={{ base: "none", sm: "flex" }}
        w={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: "login" })}
      >
        Log in
      </Button>
      <Button
        h="28px"
        display={{ base: "none", sm: "flex" }}
        w={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: "signup" })}
      >
        Sign Up
      </Button>
      <SwitchThemeButton />
    </>
  );
};

export default AuthButtons;
