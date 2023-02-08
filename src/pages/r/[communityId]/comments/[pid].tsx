import { Post } from "@/atoms/postAtom";
import About from "@/components/Community/About";
import PageContentLayout from "@/components/Layout/PageContent";
import Comments from "@/components/Posts/Comments/Comments";
import PostItem from "@/components/Posts/PostItem";
import { auth, firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import usePosts from "@/hooks/usePosts";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {};

const PostPage = (props: Props) => {
  const [user] = useAuthState(auth);
  const { postStateValue, setPostStateValue, onVote, onDeletePost } = usePosts();
  const router = useRouter();
  const { communityStateValue } = useCommunityData();

  // 避免重新整理後 會沒東西顯示 目前的資料是由主頁面引入來的 如果重新整理資料會變null
  //   const fetchPost = async (postId: string) => {
  //     try {
  //       const postDocRef = doc(firestore, "posts", postId);
  //       const postDoc = await getDoc(postDocRef);
  //       setPostStateValue((prev) => ({
  //         ...prev,
  //         selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
  //       }));
  //     } catch (error: any) {
  //       console.log("fetchPost error", error.message);
  //     }
  //   };

  // Fetch post if not in already in state 如果在一個貼文的網址內 + 當前沒有post的value 則判定 用戶重新整理
  useEffect(() => {
    const fetchPost = async (postId: string) => {
      try {
        const postDocRef = doc(firestore, "posts", postId);
        const postDoc = await getDoc(postDocRef);
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
        }));
      } catch (error: any) {
        console.log("fetchPost error", error.message);
      }
    };

    const { pid } = router.query;
    if (pid && !postStateValue.selectedPost) {
      fetchPost(pid as string);
    }
  }, [router.query, postStateValue.selectedPost, setPostStateValue]);

  return (
    <PageContentLayout>
      <>
        {postStateValue.selectedPost && (
          <PostItem
            post={postStateValue.selectedPost}
            // postIdx={postStateValue.selectedPost.postIdx}
            onVote={onVote}
            onDeletePost={onDeletePost}
            //推文的value要符合對應的文章的id
            userVoteValue={
              postStateValue.postVotes.find((item) => item.postId === postStateValue.selectedPost!.id)?.voteValue
            }
            //檢查文章是不是發文的人
            userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
          />
        )}
        <Comments
          user={user as User}
          selectedPost={postStateValue.selectedPost}
          communityId={postStateValue.selectedPost?.communityId as string}
        />
      </>
      {/* Right Content */}
      {communityStateValue.currentCommunity && <About communityData={communityStateValue.currentCommunity} />}
      <></>
    </PageContentLayout>
  );
};

export default PostPage;
