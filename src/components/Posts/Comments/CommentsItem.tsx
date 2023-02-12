import { atomindex } from "@/atoms/commentAtom";
import { Box, Flex, Icon, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsArrowDown, BsArrowRight, BsArrowUp } from "react-icons/bs";
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline } from "react-icons/io5";
import { useRecoilState } from "recoil";

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
  // const [tabIndex, setTabIndex] = useRecoilState<any>(atomindex);
  // const icons = [BsArrowUp, BsArrowDown, BsArrowRight]
  // const Icons = icons[tabIndex];

  return (
    <Flex>
      <Box>
        {comment.commentTabIndex === 0 && <Icon ml={2} as={BsArrowRight} fontSize={22} color="gray.300" />}
        {comment.commentTabIndex === 1 && <Icon ml={2} as={AiFillLike} color="green" fontSize={22} />}
        {comment.commentTabIndex === 2 && <Icon ml={2} as={AiFillDislike} color="red" fontSize={22}  />}
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
