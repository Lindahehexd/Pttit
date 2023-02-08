import { Box, Flex, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
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
        <Icon fontSize={30} color="gray.300" />
      </Box>
      <Stack>
        <Stack direction="row" align="center" fontSize="sm">
          <Text fontWeight={700} color="gray.600">
            {comment.creatorDisplayText}
          </Text>
          <Text>{moment(new Date(comment.createdAt.seconds * 1000)).format("M/D HH:mm")}</Text>
          { loadingDelete && <Spinner size='sm'/>}
        </Stack>
        <Text> {comment.text}</Text>
        <Stack direction="row" align="center" cursor="pointer" fontWeight={600} color="gray.500">
          <Icon as={IoArrowUpCircleOutline} />
          <Icon as={IoArrowDownCircleOutline} />
          {userId === comment.creatorId && (
            <>
              <Text fontSize="9pt" _hover={{ color: "blue.500" }}>
                Edit
              </Text>
              <Text fontSize="9pt" _hover={{ color: "blue.500" }} onClick={() => onDeleteComment(comment)}>
                Delete
              </Text>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};
export default CommentsItem;
