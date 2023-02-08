import { Community } from "@/atoms/communitiesAtom";
import { Post } from "@/atoms/postAtom";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
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
      console.log("post123:", posts);
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
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
              userVoteValue={postStateValue.postVotes.find((vote)=> vote.postId === item.id)?.voteValue}
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
