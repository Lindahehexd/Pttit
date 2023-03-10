import { authModalState } from "@/atoms/authModalAtom";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import AuthInput from "./AuthInput";
import OAuthButton from "./OAuthButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import ResetPassword from "./ResetPassword";

const AuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleClose = () => {
    //take the prev state and expread it then modify the single piece of state
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // when logged in , close the modal
  useEffect(() => {
    if (user) {
      setModalState((prev) => ({
        ...prev,
        open: false,
      }));
    }
    // console.log(user);
  }, [user, setModalState]);

  return (
    <div>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {modalState.view === "signup" && "註冊"}
            {modalState.view === "login" && "登入"}
            {modalState.view === "resetPassword" && "重設密碼"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={5}>
            <Flex direction="column" display="flex" justify="center" align="center" w="70%">
              {modalState.view === "login" || modalState.view === "signup" ? (
                <>
                  <OAuthButton />
                  <Text color="gray.300" fontWeight="bold">
                    或是
                  </Text>
                  <AuthInput />
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AuthModal;
