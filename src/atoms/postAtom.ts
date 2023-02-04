import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Post = {
  id?: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numberOfComment: number;
  voteStatus: number;
  imageURL?: string;
  communityImageURL?: string;
  createdAt: Timestamp;
};

interface PostState {
  selectedPost: Post | null;
  post: Post[];
}

const defaultPostState: PostState = {
  selectedPost: null,
  post: [],
};

export const postState = atom({
  key: "postState",
  default: defaultPostState,
});
