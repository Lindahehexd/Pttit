import { Flex, Button, Image } from "@chakra-ui/react";

const OAuthButton = () => {
  return (
    <Flex direction="column" w="100%" mb={4}>
      <Button variant='oauth' mb={2} >
        <Image h='20px'mr={4} src="/images/googlelogo.png" alt="" />
        Continue with google
      </Button>
      <Button variant='oauth' >Use Other Providers</Button>
    </Flex>
  );
};

export default OAuthButton;
