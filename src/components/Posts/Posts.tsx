import { Community } from "@/atoms/communitiesAtom";
import { Post } from "@/atoms/postAtom";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { RiGhostFill } from "react-icons/ri";
import PostItem from "./PostItem";
import PostLoader from "./PostLoader";

type PostsProps = {
  communityData: Community;
  userId?: string;
};

const Posts = ({ communityData }: PostsProps) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost } = usePosts();

  const getPosts = async () => {
    console.log("Getting Posts");

    try {
      setLoading(true);
      const posetQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(posetQuery);
      //postdocs.docs = array of the doc info , return with each one's id and spread all of the data
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      //save the post state into the recoil state
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
      console.log('this is the post', posts)
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    //每當切換社團時 都要更新文章
    getPosts();
  }, [communityData]);

  return (
    <>
      {postStateValue.posts.length === 0 && !loading && (
        <Flex
          direction="column"
          justify="center"
          align="center"
          border="1px solid"
          borderColor="gray.600"
          borderRadius="xl"
          p={20}
        >
          <Icon as={RiGhostFill} fontSize={150} color="gray.500" opacity="0.5" />
          <Text fontWeight={700} color="gray.500">
            Woo～成為第一個發文的人吧！
          </Text>
        </Flex>
      )}

      {/* 如果沒文章情況下loading 就不要跑出skeleton > 所以當loading時且有文章時 就跑skeleton出來 > 沒loading後就會跑出文章 */}

      {loading && postStateValue.posts.length > 0 ? (
        <PostLoader />
      ) : (
        <Stack>
          Posts
          {postStateValue.posts.map((item) => (
            <PostItem
              key={item.id}
              post={item}
              userIsCreator={user?.uid === item.creatorId}
              // post the value to the post compoments
              userVoteValue={postStateValue.postVotes.find((vote) => vote.postId === item.id)?.voteValue}
              onVote={onVote}
              onDeletePost={onDeletePost}
              onSelectPost={onSelectPost}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export default Posts;
