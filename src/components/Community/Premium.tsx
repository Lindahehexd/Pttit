import React, { useEffect, useState } from "react";
import { Flex, Icon, Text, Stack, Button, Image } from "@chakra-ui/react";
import { GiCheckedShield } from "react-icons/gi";

const Premium: React.FC = () => {



  return (
    <Flex direction="column" borderRadius={4} cursor="pointer" p="1px" border="1px solid" borderColor="gray.600" >
      <Flex mb={2} bgImage="url(/images/pttlogin2.png)" backgroundSize='cover' h='150px' >
      </Flex>
        <Stack spacing={1} fontSize="9pt" pl={2}>
        </Stack>
        <Flex w='100%' align='center' justify='center'>
      <Button w='80%' alignItems='center' justifyContent='center' height="30px" bg='gray.700' mb={2} >成為鄉民</Button>
        </Flex>
    </Flex>
  );
};
export default Premium;
