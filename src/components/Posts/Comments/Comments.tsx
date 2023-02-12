import { useEffect, useState } from "react";
import { Post, postState } from "@/atoms/postAtom";
import { User } from "firebase/auth";
import { Box, Flex, SkeletonCircle, SkeletonText, Stack, Text } from "@chakra-ui/react";
import CommentInput from "./CommentInput";
import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { useRecoilValue, useSetRecoilState } from "recoil";
import CommentsItem from "./CommentsItem";
import { atomindex } from "@/atoms/commentAtom";

type CommnetsProps = {
  user: User;
  selectedPost: Post | null;
  communityId: string;
};

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

const Comments = ({ user, selectedPost, communityId }: CommnetsProps) => {
  const currentTabIndexValue = useRecoilValue(atomindex);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const setPostState = useSetRecoilState(postState);

  const onCreateComment = async () => {
    setCreateLoading(true);
    try {
      const batch = writeBatch(firestore);
      //create the documents
      const commentDocRef = doc(collection(firestore, "comments"));
      // documents data
      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.email!.split("@")[0],
        communityId,
        postId: selectedPost?.id!,
        postTitle: selectedPost?.title!,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
        // icon
        commentTabIndex: currentTabIndexValue,
      };
      // set to db
      batch.set(commentDocRef, newComment);

      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

      // update the number of comments in the posts
      const postDocRef = doc(firestore, "posts", selectedPost?.id as string);
      batch.update(postDocRef, {
        numberOfComment: increment(1),
      });

      await batch.commit();
      // update recoil state
      // 1 clear the input
      setCommentText("");
      //2 update the newest one at the top, and all other existings behind it
      setComments((prev) => [newComment, ...prev]);
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComment: prev.selectedPost?.numberOfComment! + 1,
        } as Post,
      }));
    } catch (error) {
      console.log(error);
    }
    setCreateLoading(false);
  };

  const onDeleteComment = async () => {};

  const getPostComments = async () => {
    console.log("start get commnet");

    try {
      // 5 245 03 in order to perform the query on the collection, we need the index
      const commentsQuery = query(
        //query the collection > seach the commments collection > use 'where' to find the specific document in this collection
        collection(firestore, "comments"),
        where("postId", "==", selectedPost?.id),
        // // the latest will on the top
        orderBy("createdAt", "desc")
      );

      console.log("selector id", selectedPost?.id);

      //fetch the data from the db

      const commentDocs = await getDocs(commentsQuery);
      // after get back from firestore , extract all of the data  of them and store in state
      const comments = commentDocs.docs.map((doc) => ({
        //take each doc and extract the data out of it , creating a new obj  with id and its whole data
        id: doc.id,
        ...doc.data(),
      }));
      setComments(comments as Comment[]);
      console.log("try get doc", commentDocs.docs);
      console.log("try get commnet", comments);
    } catch (error: any) {
      console.log("getPostComments error", error.message);
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    if(!selectedPost) return
    console.log("try run use effect when selectedPost is not undefined ");
    getPostComments();
  }, [selectedPost]);

  return (
    <Box bg="gray.700" borderRadius="0px 0px 4px 4px" p={2}>
      <Flex direction="column" pl={10} pr={4} mb={6} fontSize="10pt" w="100%">
        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          user={user}
          createLoading={createLoading}
          onCreateComment={onCreateComment}
        />
      </Flex>
      <Stack spacing={6} p={2}>
        {fetchLoading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} padding="6" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={2} spacing="4" />
              </Box>
            ))}
          </>
        ) : (
          <>
            {!!comments.length ? (
              <>
                {comments.map((comment: Comment) => (
                  <CommentsItem
                    key={comment.id}
                    comment={comment}
                    onDeleteComment={onDeleteComment}
                    loadingDelete={false}
                    userId={user?.uid}
                  />
                ))}
              </>
            ) : (
              <Flex
                direction="column"
                justify="center"
                align="center"
                borderTop="1px solid"
                borderColor="gray.100"
                p={20}
              >
                <Text fontWeight={700} opacity={0.3}>
                  尚未有人留言
                </Text>
              </Flex>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Comments;
