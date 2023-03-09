import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import moment from "moment";

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

const CommentsItem = ({ comment, userId }: CommentsItemProp) => {
  return (
    <Flex fontSize={{ base: "9px", md: "10px", lg: "16px" }} my={1}>
      {/* container */}

      {/* icon */}
      <Flex align="self-start">
        {comment.commentTabIndex === 0 && <Icon ml={2} as={BsArrowRight} fontSize={22} color="red.400" />}
        {comment.commentTabIndex === 1 && <Icon ml={2} as={AiFillLike} color="green" fontSize={22} />}
        {comment.commentTabIndex === 2 && <Icon ml={2} as={AiFillDislike} color="red.500" fontSize={22} />}
      </Flex>

      {/* id */}
      <Flex>
        <Text ml={2} color="yellow.400">
          {comment.creatorDisplayText}:
        </Text>
      </Flex>

      {/* mesg */}

      <Flex flexGrow={1}>
        <Text ml={2} color="yellow.400" wordBreak="break-word">
          {comment.text}
        </Text>
      </Flex>

      {/* time  */}
      <Box minW="75px" ml={2}>
        <Text>{moment(new Date(comment.createdAt.seconds * 1000)).format("M/D HH:mm")}</Text>
      </Box>

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
