import { Post } from "@/atoms/postAtom";
import { Flex, HStack, Icon, Image, Skeleton, Spinner, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import { BsChat } from "react-icons/bs";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";

export type PostItemContentProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => void;
  //return promise bc its async , it will communicate with the db
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: () => void;
};

const PostItem = ({ post, userIsCreator, onVote, onDeletePost, onSelectPost, userVoteValue }: PostItemContentProps) => {
  const [imgloading, setImgLoading] = useState(true);
  const [deleteloading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const success = await onDeletePost(post);
      if (!success) {
        throw new Error("fail to delete the post");
      }
      console.log("delete the post successfully");
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    }
    setDeleteLoading(false);
  };

  return (
    //outer
    <Flex
      border="1px solid"
      bg="pink"
      borderColor="gray.300"
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}
      cursor="pointer"
      onClick={onSelectPost}
    >
      {/* left */}
      <Flex direction="column" align="center" bg="gray.200" p={2} borderRadius={4} w="40px">
        <Icon
          as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          cursor="pointer"
        />
        <Text fontSize="sm"> {post.voteStatus}</Text>
        <Icon
          as={userVoteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
          color={userVoteValue === -1 ? "brand.100" : "gray.400"}
          cursor="pointer"
          onClick={onVote}
        />
      </Flex>
      {/* right */}
      <Flex direction="column" w="100%">
        <Stack spacing={1} p="10px">
          <HStack align="center" fontSize="sm">
            <Text>
              posted by u/{post.creatorDisplayName} {""}
              {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
            </Text>
          </HStack>
          <Text fontSize="lg" fontWeight="bold">
            {post.title}
          </Text>
          <Text>{post.body}</Text>
          {post.imageURL && (
            <Flex>
              {imgloading && <Skeleton h="200px" w="100%" borderRadius={4} />}
              <Image
                src={post.imageURL}
                maxH="460px"
                alt=""
                onLoad={() => setImgLoading(false)}
                display={imgloading ? "none" : "unset"}
              />
            </Flex>
          )}
          <Flex
            bg="teal.500"
            ml={1}
            mb={0.5}
            //    color='gray.500'
          >
            {/* bot item 1  */}
            <Flex p="8px 10px" borderRadius={4} _hover={{ bg: "gray.200" }} cursor="pointer" align="center">
              <Icon mr={2} as={BsChat} />
              <Text fontSize="sm">{post.numberOfComment}</Text>
            </Flex>
            {/* bot item 2  */}
            <Flex p="8px 10px" borderRadius={4} _hover={{ bg: "gray.200" }} cursor="pointer" align="center">
              <Icon mr={2} as={IoArrowRedoOutline} />
              <Text fontSize="sm">Share</Text>
            </Flex>
            {/* bot item 3  */}
            <Flex p="8px 10px" borderRadius={4} _hover={{ bg: "gray.200" }} cursor="pointer" align="center">
              <Icon mr={2} as={IoBookmarkOutline} />
              <Text fontSize="sm">Save</Text>
            </Flex>
            {/* bot item 4 when you are post author  */}
            {userIsCreator && (
              <Flex
                p="8px 10px"
                borderRadius={4}
                _hover={{ bg: "gray.200" }}
                cursor="pointer"
                align="center"
                onClick={handleDelete}
              >
                {deleteloading ? (
                  <Spinner size='sm' />
                ) : (
                  <>
                    <Icon mr={2} as={AiOutlineDelete} />
                    <Text fontSize="sm">Delete</Text>{" "}
                  </>
                )}
              </Flex>
            )}
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default PostItem;
