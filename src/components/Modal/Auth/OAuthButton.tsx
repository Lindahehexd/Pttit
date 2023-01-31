import { Flex, Button, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";


const OAuthButton = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <Flex direction="column" w="100%" mb={4}>
      <Button variant="oauth" mb={2} isLoading={loading} onClick={() => signInWithGoogle()}>
        <Image h="20px" mr={4} src="/images/googlelogo.png" alt="" />
        Continue with google
      </Button>
      <Button variant="oauth">Use Other Providers</Button>
      {/* dom 無法顯示object {error}會報錯 要text{error.message}才可 */}
      {error && <Text>error.message</Text>}
    </Flex>
  );
};

export default OAuthButton;
