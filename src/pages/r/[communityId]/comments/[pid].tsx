import About from "@/components/Community/About";
import Comments from "@/components/Posts/Comments/Comments";
import PageContentLayout from "@/components/Layout/PageContent";
import PostItem from "@/components/Posts/PostItem";
import useCommunityData from "@/hooks/useCommunityData";
import usePosts from "@/hooks/usePosts";
import { Post } from "@/atoms/postAtom";
import { User } from "firebase/auth";
import { auth, firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const PostPage = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { communityStateValue } = useCommunityData();
  const { postStateValue, setPostStateValue, onVote, onDeletePost } = usePosts();

  // 避免重新整理後 會沒東西顯示 目前的資料是由主頁面引入來的 如果重新整理資料會變null
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

  // Fetch post if not in already in state 如果在一個貼文的網址內 + 當前沒有post的value 則判定 用戶重新整理
  useEffect(() => {
    const { pid } = router.query;
    if (pid && !postStateValue.selectedPost) {
      fetchPost(pid as string);
    }
  }, [router.query, postStateValue.selectedPost, setPostStateValue]);

  return (
    <>
      <Head>
        <title>Post – PTTit</title>
        <meta
          name="description"
          content="PTTit結合PTT與Reddit，可以讓你建立看板，也能搜尋文章、查詢看板，甚至讓你推噓文，現在就成為PTTit的鄉民吧!"
        />
        <meta property="og:image" content="/images/pview.jpg" />
      </Head>

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
        <>{communityStateValue.currentCommunity && <About communityData={communityStateValue.currentCommunity} />}</>
      </PageContentLayout>
    </>
  );
};

export default PostPage;
