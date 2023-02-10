import React from "react";
import { Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";

const PersonalHome: React.FC = () => {
  return (
    <Flex
      direction="column"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.600"
      position="sticky"
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="34px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/proffesor.jpg)"
        backgroundSize="cover"
      ></Flex>
      <Flex direction="column" p="12px">
        <Flex align="center" mb={2}>
          <Icon as={FaReddit} fontSize={50} color="yellow.300" mr={2} />
          <Text fontWeight={600}>Home</Text>
        </Flex>
        <Stack spacing={3}>
          <Text fontSize="9pt">還不知道塞啥</Text>
          <Button height="30px">Create Post</Button>
          <Button variant="outline" height="30px">
            還不知道塞啥
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};
export default PersonalHome;
