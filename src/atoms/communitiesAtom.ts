import { atom } from "recoil";
import { FieldValue, Timestamp } from "firebase/firestore";

//store all the global data with community

export interface Community {
  id: string;
  creatorId: string;
  numberOfMember: number;
  privacyType: "public" | "restrictied" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}

export interface CommunitySnippet {
  communityId: string;
  //only if cretae the community
  isModerator?: boolean;
  imageURL?: string;
}

interface CommunityState {
  mySnippets: CommunitySnippet[];
  //current community user in
  currentCommunity?: Community;

  //   [key: string]:
  //     | CommunitySnippet[]
  //     | { [key: string]: Community }
  //     | Community
  //     | boolean
  //     | undefined;
  //   mySnippets: CommunitySnippet[];
  //   initSnippetsFetched: boolean;
  //   visitedCommunities: {
  //     [key: string]: Community;
  //   };
  //   currentCommunity: Community;
}

// export const defaultCommunity: Community = {
//   id: "",
//   creatorId: "",
//   numberOfMembers: 0,
//   privacyType: "public",
// };

export const defaultCommunityState: CommunityState = {
  mySnippets: [],
};
//   initSnippetsFetched: false,
//   visitedCommunities: {},
//   currentCommunity: defaultCommunity,
// };

export const communityState = atom<CommunityState>({
  key: "communitiesState",
  default: defaultCommunityState,
});
