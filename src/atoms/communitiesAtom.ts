import { atom } from "recoil";
import { Timestamp } from "firebase/firestore";

//store all the global data with community

export interface Community {
  id: string;
  creatorId: string;
  numberOfMember: number;
  privacyType: "public" | "restrictied" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
  aboutCommunity: string;
  communityInfo: string;
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
}

export const defaultCommunityState: CommunityState = {
    mySnippets: [],
};

export const communityState = atom<CommunityState>({
  key: "communitiesState",
  default: defaultCommunityState,
});
