import { communityState } from "@/atoms/communitiesAtom";
import { Post } from "@/atoms/postAtom";
import AllCommunities from "@/components/Community/AllCommunities";
import CreatePostLink from "@/components/Community/CreatePostLink";
import PersonalHome from "@/components/Community/PersonalHome";
import Premium from "@/components/Community/Premium";
import TopCommunities from "@/components/Community/TopCommunities";
import PageContentLayout from "@/components/Layout/PageContent";
import PostItem from "@/components/Posts/PostItem";
import PostLoader from "@/components/Posts/PostLoader";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { Stack, Text } from "@chakra-ui/react";
import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

export default function Home() {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost } = usePosts();
  const communityStateValue = useRecoilValue(communityState);

  //   const buildNoUserHomeFeed = async () => {
  //     setLoading(true);
  //     try {
  //       const postQuery = query(collection(firestore, "posts"), orderBy("voteStatus", "desc"), limit(10));
  //       const postDocs = await getDocs(postQuery);
  //       const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //       setPostStateValue((prev) => ({
  //         ...prev,
  //         posts: posts as Post[],
  //       }));
  //     } catch (error) {
  //       console.log("buildNoUserHomeFeed", error);
  //     }
  //     setLoading(false);
  //   };
  //   const getUserPostVotes = () => {};

  //   useEffect(() => {
  //     if (!user && !loadingUser) buildNoUserHomeFeed();
  //   }, [user, loadingUser]);

  return (
    <PageContentLayout>
      <>
        <AllCommunities />
        {/* <CreatePostLink /> */}
        {/* left
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onSelectPost={onSelectPost}
                onDeletePost={onDeletePost}
                onVote={onVote}
                userVoteValue={postStateValue.postVotes.find((item) => item.postId === item.id)?.voteValue}
                userIsCreator={user?.uid === post.creatorId}
                homePage
              />
            ))}
          </Stack>
        )} */}
      </>
      {/* right */}
      <>
        <Stack spacing={7}>
          <TopCommunities />
          <Premium />
          <PersonalHome />
        </Stack>
      </>
    </PageContentLayout>
  );
}
