import { Box, Flex, HStack, Icon, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
  commentTabIndex: number;
};

export type CommentsItemProp = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  loadingDelete: boolean;
  userId: string;
};

const CommentsItem = ({ comment, onDeleteComment, loadingDelete, userId }: CommentsItemProp) => {
  return (
    <Flex bg="gray.400" fontSize={{ base: "9px", md: "10px", lg: "16px" }} my={1}>
      {/* container */}

      {/* icon */}
      <Flex bg="pink.700">
        {comment.commentTabIndex === 0 && <Icon ml={2} as={BsArrowRight} fontSize={22} color="gray.300" />}
        {comment.commentTabIndex === 1 && <Icon ml={2} as={AiFillLike} color="green" fontSize={22} />}
        {comment.commentTabIndex === 2 && <Icon ml={2} as={AiFillDislike} color="red" fontSize={22} />}
      </Flex>

      {/* id */}
      <Flex bg="teal.500">
        <Text ml={2} color="yellow.400">
          {comment.creatorDisplayText}:
        </Text>
      </Flex>

      {/* mesg */}
      <Flex bg="blue.600" flexGrow={1}>
        <Text ml={2} color="yellow.400">
          {comment.text}
        </Text>
      </Flex>

      {/* time  */}
      <Box bg="yellow.700" minW="75px">
        <Text>{moment(new Date(comment.createdAt.seconds * 1000)).format("M/D HH:mm")}</Text>
      </Box>

      {/* <Stack w="100%" align="center" bg='blue'>



        <Flex w="100%" justify="space-between" align="center">
          <Flex>
            <Text ml={2} color="yellow.400">
              {comment.creatorDisplayText}:
            </Text>
            <Text ml={2} color="yellow.400">
              {comment.text}
            </Text>
          </Flex>
          <Text>{moment(new Date(comment.createdAt.seconds * 1000)).format("M/D HH:mm")}</Text>
        </Flex>
      </Stack> */}

      <Stack direction="row" align="center" cursor="pointer" fontWeight={600} color="gray.500">
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
