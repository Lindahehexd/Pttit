import { Post, postState, PostVote } from "@/atoms/postAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { collection, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);
  const [user] = useAuthState(auth);

  // 比較難的部分會直接用中文打
  const onVote = async (post: Post, vote: number, communityId: string) => {
    //  5 56 44

    try {
      const { voteStatus } = post;
      //use find the seach the specific vote in this array
      const existingVote = postStateValue.postVotes.find((vote) => vote.postId === post.id);

      // use batch
      const batch = writeBatch(firestore);

      //create copy of post argument / state variables . goal : modify the below logics => use them to update the state.
      const updatedPost = { ...post };
      const updatedPosts = { ...postStateValue.posts };
      //use let, bc will assign a new value
      let updatedPostVotes = { ...postStateValue.postVotes };
      let voteChange = vote;

      //means this is a new vote
      if (!existingVote) {
        //add subtract1 to/from post.value
        // create new post document
        const postVoteRef = doc(collection(firestore, "users", `${user?.uid}.postVote`));

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id!,
          communityId,
          voteValue: vote,
        };

        console.log("NEW VOTE", newVote);
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
          //
          updatedPost.voteStatus = voteStatus - vote;
          // update the votestaet and remove the existing vote. 所以從新的postvotes裡面(vote) 篩選出(vote.id) 與現有值( existing vote.id) 一樣的名稱的值
          updatedPostVotes = updatedPostVotes.filter((vote) => vote.id !== existingVote.id);

          //delete the postVote documents

          batch.delete(postVoteRef);

          voteChange *= -1;

          // flipping  推變噓  數值-2  噓變推  數值+2  vote 可能是1/-1
          updatedPost.voteStatus = voteStatus + 2 * vote;
          // 修改現有array裡的值, 找出現有的vote  / use index to find a particular item in an array 
          const voteIdx = postStateValue.postVotes.findIndex((vote) => vote.id === existingVote.id);
        }
      }
    } catch (error: any) {
      console.log("voteError", error.message);
    }
  };

  const onSelectPost = () => {};

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

  return { postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost };
};

export default usePosts;
