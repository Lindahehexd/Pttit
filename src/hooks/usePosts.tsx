import { authModalState } from "@/atoms/authModalAtom";
import { communityState } from "@/atoms/communitiesAtom";
import { Post, postState, PostVote } from "@/atoms/postAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const currentCommunity = useRecoilValue(communityState).currentCommunity;
  const setAuthModalState = useSetRecoilState(authModalState);

  // 比較難的部分會直接用中文打

  const onVote = async (post: Post, vote: number, communityId: string) => {
    //如果沒登入 想推或噓都要先登入
    if (!user?.uid) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    //  5 56 44

    //參考

    //     (alias) type Post = {
    //     id?: string | undefined;
    //     communityId: string;
    //     creatorId: string;
    //     creatorDisplayName: string;
    //     title: string;
    //     body: string;
    //     numberOfComment: number;
    //     voteStatus: number;
    //     imageURL?: string | undefined;
    //     communityImageURL?: string | undefined;
    //     createdAt: Timestamp;
    // }

    // const defaultPostState: PostState = {
    //     selectedPost: null,
    //     posts: [],
    //     postVotes: [],
    //   };

    try {
      const { voteStatus } = post;
      //use find the seach the specific vote in this array
      const existingVote = postStateValue.postVotes.find((vote) => vote.postId === post.id);
      // use batch
      const batch = writeBatch(firestore);
      //create copy of post argument / state variables . goal : modify the below logics => use them to update the state.
      const updatedPost = { ...post };
      const updatedPosts = [...postStateValue.posts];
      //use let, bc will assign a new value
      let updatedPostVotes = [...postStateValue.postVotes];
      let voteChange = vote;

      //means this is a new vote
      if (!existingVote) {
        //add subtract1 to/from post.value
        // create new post document
        // const postVoteRef = doc(collection(firestore, "users", `${user?.uid}.postVote`));
        const postVoteRef = doc(collection(firestore, "users", `${user?.uid}/postVotes`));

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id!,
          communityId,
          voteValue: vote,
        };

        // console.log("NEW VOTE", newVote);
        //   the document we want to set, the data we want to add.
        batch.set(postVoteRef, newVote);
        // +1 -1 depend on the post.voteStatus, vote could be 1, -1
        updatedPost.voteStatus = voteStatus + vote;
        // take all the existing post and add the  new vote to the end of it
        updatedPostVotes = [...updatedPostVotes, newVote];
      }
      // exsist user thet have vote before
      else {
        // Used for both possible cases of batch writes
        const postVoteRef = doc(firestore, "users", `${user?.uid}/postVotes/${existingVote.id}`);
        // undo the votes number 2變1 / 3變2  所以vote必須是-1
        if (existingVote.voteValue === vote) {
          //所以vote必須是-1
          updatedPost.voteStatus = voteStatus - vote;
          // update the votestaet and remove the existing vote. 所以從新的postvotes裡面(vote) 篩選出(vote.id) 與現有值( existing vote.id) 一樣的名稱的值
          updatedPostVotes = updatedPostVotes.filter((vote) => vote.id !== existingVote.id);
          //delete the postVote documents
          batch.delete(postVoteRef);
          voteChange *= -1;
        } else {
          // flipping  推變噓  數值-2  噓變推  數值+2  vote 可能是1/-1
          updatedPost.voteStatus = voteStatus + 2 * vote;
          // 修改現有array裡的值, 找出現有的vote  / use index to find a particular item in an array
          const voteIdx = postStateValue.postVotes.findIndex((vote) => vote.id === existingVote.id);

          updatedPostVotes[voteIdx] = {
            ...existingVote,
            voteValue: vote,
          };
          // update the votes
          batch.update(postVoteRef, {
            voteValue: vote,
          });
          voteChange = 2 * vote;
        }
      }

      // update post document
      const postRef = doc(firestore, "posts", post.id!);
      // vote會根據不同情況去變化  可能是 +1 -1  +2 -2
      batch.update(postRef, { voteStatus: voteStatus + voteChange });
      //   執行上方batch寫的內容
      await batch.commit();

      //  update global 的值 修改後前端能及時顯示修改後的內容
      const postIdx = postStateValue.posts.findIndex((item) => item.id === post.id);
      updatedPosts[postIdx] = updatedPost;
      setPostStateValue((prev) => ({
        ...prev,
        //要把 updatePost 裡面的資料 傳進 updatePosts裡面 目前它裡面是空的
        posts: updatedPosts,
        postVotes: updatedPostVotes,
      }));

      // 如果我們在單一頁面的話 vote的值也要跟著變動

      if (postStateValue.selectedPost) {
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: updatedPost,
        }));
      }
    } catch (error: any) {
      console.log("voteError", error.message);
    }
  };

  const onSelectPost = (post: Post) => {
    setPostStateValue((prev) => ({
      ...prev,
      selectedPost: post,
    }));
    router.push(`/r/${post.communityId}/comments/${post.id}`);
  };

  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      //check img
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }
      //delte the post doc from db
      const postDocRef = doc(firestore, "posts", post.id!);
      await deleteDoc(postDocRef);
      // update the recoil state
      setPostStateValue((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));

      return true;
    } catch (error: any) {
      console.log(error.message);
      return false;
    }
  };

  const getCommunityPostVotes = async (communityId: string) => {
    const postVotesQuery = query(
      collection(firestore, `users/${user?.uid}/postVotes`),
      where("communityId", "==", communityId)
    );
    const postVoteDocs = await getDocs(postVotesQuery);
    const postVotes = postVoteDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPostStateValue((prev) => ({
      ...prev,
      postVotes: postVotes as PostVote[],
    }));
  };

  //when loggout , only clear the community snippet , not reset the community
  useEffect(() => {
    if (!user || !currentCommunity?.id) return;
    getCommunityPostVotes(currentCommunity?.id);
  }, [user, currentCommunity]);

  useEffect(() => {
    if (!user) {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    }
  }, [user]);

  return { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost };
};

export default usePosts;
