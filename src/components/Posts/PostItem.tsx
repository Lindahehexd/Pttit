import { Post } from "@/atoms/postAtom";
import { Button, Flex, HStack, Icon, Image, Skeleton, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import moment from "moment";
import { BsChat, BsDot } from "react-icons/bs";
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
import { useRouter } from "next/router";
import { FaReddit } from "react-icons/fa";
import Link from "next/link";
import { RiEarthFill } from "react-icons/ri";

export type PostItemContentProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (post: Post, vote: number, communityId: string) => void;
  //return promise bc its async , it will communicate with the db
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  //add on last (p6 1636)
  homePage?: boolean;
};

const PostItem = ({
  post,
  userIsCreator,
  onVote,
  onDeletePost,
  onSelectPost,
  userVoteValue,
  homePage,
}: PostItemContentProps) => {
  const [imgloading, setImgLoading] = useState(true);
  const [deleteloading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(false);
  //p5 14051
  const singlePostPage = !onSelectPost;
  const router = useRouter();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const success = await onDeletePost(post);
      if (!success) {
        throw new Error("fail to delete the post");
      }
      console.log("delete the post successfully");
      if (singlePostPage) {
        router.push(`/r/${post.communityId}`);
      }
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    }
    setDeleteLoading(false);
  };

  const handleCopy = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    toast({
      title: "URL Copied!",
      position: "top",
      description: "The URL has been successfully copied to your clipboard.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    //outer
    <Flex
      border="1px solid"
      bg="gray.700"
      borderColor="gray.700"
      borderRadius={4}
      _hover={{ borderColor: singlePostPage ? "none" : "gray.700" }}
      cursor={singlePostPage ? "unset" : "pointer"}
      // check if truthy
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      {/* left */}
      <Flex direction="column" align="center" bg={singlePostPage ? "none" : "blue.900"} p={2} borderRadius={4} w="40px">
        {/* <Icon
          as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
          color={userVoteValue === 1 ? "green.500" : "gray.400"}
          cursor="pointer"
          onClick={(event) => {
            event.stopPropagation();
            onVote(post, 1, post.communityId);
          }}
        /> */}
        <Button
          size="xs"
          variant="ghost"
          bg={userVoteValue === 1 ? "green.500" : "none"}
          _hover={{ bg: userVoteValue === 1 ? "green.600" : "none" }}
          rounded="full"
          onClick={(event) => {
            event.stopPropagation();
            onVote(post, 1, post.communityId);
          }}
        >
          推
        </Button>

        <Text fontSize="lg" color={post.voteStatus > 0 ? "yellow.300" : "gray.400"}>
          {post.voteStatus}
        </Text>

        <Button
          size="xs"
          variant="ghost"
          bg={userVoteValue === -1 ? "red.500" : "none"}
          _hover={{ bg: userVoteValue === -1 ? "red.600" : "none" }}
          rounded="full"
          onClick={(event) => {
            event.stopPropagation();
            onVote(post, -1, post.communityId);
          }}
        >
          噓
        </Button>

        {/* <Icon
            as={userVoteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
          color={userVoteValue === -1 ? "brand.100" : "gray.400"}
          cursor="pointer"
          onClick={(event) => {
            event.stopPropagation();
            onVote(post, -1, post.communityId);
          }}
        /> */}
      </Flex>
      {/* right */}
      <Flex direction="column" w="100%">
        <Stack spacing={1} p="10px">
          <HStack align="center" fontSize="sm">
            {/* 判斷是否在主頁  如果在主頁要顯示社團圖案跟名稱 */}
            {homePage && (
              <>
                {post.communityImageURL ? (
                  <Image src={post.communityImageURL} borderRadius="full" fontSize="18px" mr={2} alt="" />
                ) : (
                  <Icon as={RiEarthFill} fontSize="18px" mr={1} color="blue.500" />
                )}
                <Link href={`r/${post.communityId}`}>
                  <Text
                    fontWeight="bold"
                    _hover={{ textDecoration: "underline" }}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >{`r/${post.communityId}`}</Text>
                </Link>
                <Icon as={BsDot} color="gray.500" />
              </>
            )}
            <Flex justify="space-between" color="gray.500" w="100%">
              <Text fontSize="xs">
                作者: {""}
                {post.creatorDisplayName} {""}
              </Text>
              <Text>{moment(new Date(post.createdAt.seconds * 1000)).format("MM/DD")}</Text>
            </Flex>
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
          

          {/* 留言按鈕區 */}
          <Flex
            // bg="teal.500"
          >
            {/* bot item 1  */}
            <Flex p="8px 10px" borderRadius={4} _hover={{ bg: "gray.600" }} cursor="pointer" align="center"  mt={2}>
              <Icon mr={2} as={BsChat} />
              <Text fontSize="sm">{post.numberOfComment}</Text>
            </Flex>
            {/* bot item 2  */}
            <Flex mt={2}
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.600" }}
              cursor="pointer"
              align="center"
              onClick={handleCopy}
            >
              <Icon mr={2} as={IoArrowRedoOutline} />
              <Text fontSize="sm">分享</Text>
            </Flex>
            {/* bot item 4 when you are post author  */}
            {userIsCreator && (
              <Flex mt={2}
                p="8px 10px"
                borderRadius={4}
                _hover={{ bg: "gray.600" }}
                cursor="pointer"
                align="center"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDelete();
                }}
              >
                {deleteloading ? (
                  <Spinner size="sm" />
                ) : (
                  <>
                    <Icon mr={2} as={AiOutlineDelete} />
                    <Text fontSize="sm">刪除文章</Text>{" "}
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
