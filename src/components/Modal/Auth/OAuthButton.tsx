import { Flex, Button, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";

const OAuthButton = () => {
  const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);

  const createUserDoc = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) createUserDoc(userCred.user);
  }, [userCred]);

  return (
    <Flex direction="column" w="100%" mb={2}>
      <Button bg="black" mb={2} isLoading={loading} onClick={() => signInWithGoogle()} fontWeight="sm">
        <Image h="20px" mr={4} src="/images/googlelogo.png" alt="" />
        使用google帳號登入
      </Button>
      {/* dom 無法顯示object {error}會報錯 要text{error.message}才可 */}
      {error && <Text>error.message</Text>}
    </Flex>
  );
};

export default OAuthButton;
