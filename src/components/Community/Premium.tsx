import React, { useEffect, useState } from "react";
import { Flex, Icon, Text, Stack, Button, Image } from "@chakra-ui/react";
import { GiCheckedShield } from "react-icons/gi";

const Premium: React.FC = () => {
    const [memeUrl, setMemeUrl] = useState("");



  return (
    <Flex direction="column" borderRadius={4} cursor="pointer" p="12px" border="1px solid" borderColor="gray.600">
      <Flex mb={2}>
        <Icon as={GiCheckedShield} fontSize={26} color="yellow.300" mt={2} />
        <Stack spacing={1} fontSize="9pt" pl={2}>
          <Text fontWeight={600}>123</Text>
          <Image src={memeUrl}/>
          <Text>還沒想到塞啥</Text>
        </Stack>
      </Flex>
      <Button height="30px">TEST</Button>
    </Flex>
  );
};
export default Premium;
