import { Flex, Box, Text, Stack, Divider } from "@chakra-ui/react";

const PostRule = () => {
  return (
    <Box position="sticky" top="14px" mt={20}>
      {/* top */}
      <Flex bg="#000088" color="white" p={3} borderRadius="4px 4px 0px 0px">
        <Text> 貼心提醒 </Text>
      </Flex>
      {/* remain */}
      <Flex direction="column" p={3} bg={"whiteAlpha.200"} borderRadius="0px 0px 4px 4px">
        <Stack>
          <Flex w="100%" p={2}>
            <Flex flexGrow={1} maxWidth="300px">
              <Text>尊重自己，尊重他人</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex w="100%" p={2}>
            <Flex flexGrow={1} maxWidth="300px">
              <Text>發布前確認有無重複的貼文</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex w="100%" p={2}>
            <Flex flexGrow={1} maxWidth="300px">
              <Text>如有引用文章，請註明來源</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex w="100%" p={2}>
            <Flex flexGrow={1} maxWidth="300px">
              <Text>遵守板規</Text>
            </Flex>
          </Flex>
          <Divider />
        </Stack>
      </Flex>
    </Box>
  );
};

export default PostRule;
