import { Box, Flex, Icon, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { BsArrowRight } from "react-icons/bs";
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline } from "react-icons/io5";

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};

export type CommentsItemProp = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  loadingDelete: boolean;
  userId: string;
};

const CommentsItem = ({ comment, onDeleteComment, loadingDelete, userId }: CommentsItemProp) => {
  return (
    <Flex>
      <Box>
        <Icon ml={2} as={BsArrowRight} fontSize={22} color="gray.300" />
      </Box>
      <VStack w="100%" align="center">
        <Flex w="100%" justify="space-between" align="center">
          <Flex>
            <Text ml={2} color="yellow.400">
              {comment.creatorDisplayText}:
            </Text>
            <Text ml={2} color="yellow.400">
              {comment.text}
            </Text>
          </Flex>
          {/* <Text color="yellow.400"> {comment.text}</Text> */}
          <Text>{moment(new Date(comment.createdAt.seconds * 1000)).format("M/D HH:mm")}</Text>
        </Flex>
      </VStack>

      {/* <Stack direction="row" align="center" fontSize="sm">

            <Flex justify='space-between' bg='teal' w='90%'>
            id
          <Text fontWeight={700} color="gray.200">
            {comment.creatorDisplayText}
          </Text>
          time
          <Text>{moment(new Date(comment.createdAt.seconds * 1000)).format("M/D HH:mm")}</Text>
          { loadingDelete && <Spinner size='sm'/>}
          </Flex>

          comment
        </Stack> */}

      <Stack direction="row" align="center" cursor="pointer" fontWeight={600} color="gray.500">
        {/* <Icon as={IoArrowUpCircleOutline} />
          <Icon as={IoArrowDownCircleOutline} /> */}
        {userId === comment.creatorId && (
          <>
            {/* <Text fontSize="9pt" _hover={{ color: "blue.500" }}>
                Edit
              </Text> */}
            {/* <Text fontSize="9pt" _hover={{ color: "blue.500" }} onClick={() => onDeleteComment(comment)}>
                Delete
              </Text> */}
          </>
        )}
      </Stack>
    </Flex>
  );
};
export default CommentsItem;
