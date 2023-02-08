import { Community, CommunitySnippet, communityState } from "@/atoms/communitiesAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, getDoc, getDocs, increment, writeBatch } from "firebase/firestore";
import { auth, firestore } from "@/firebase/clientApp";
import { authModalState } from "@/atoms/authModalAtom";
import router, { useRouter } from "next/router";
import { Post } from "@/atoms/postAtom";

type getsnippet = {
  getMysnippet: () => void;
};

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModalState);

  const onJoinLeaveCommunity = (communityData: Community, isJoined: boolean) => {
    // only logged in user can join/leave  4.3918

    if (!user) {
      setAuthModalState({ open: true, view: "login" });
    }

    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  //   const getMysnippet = async () => {
  //     setLoading(true);
  //     try {
  //       //get the info from the snippets collections in the firebase
  //       const snippetDocs = await getDocs(collection(firestore, `user/${user?.uid}/communitySnippet`));
  //       // extract all the doc data in obj
  //       const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
  //       console.log(snippets);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const joinCommunity = async (communityData: Community) => {
    //batch write

    //cretae the snippets

    //updating the number of member to community

    //uupdate the recoil mysnippet state

    try {
      const batch = writeBatch(firestore);
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };

      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id // will for sure have this value at this point
        ),
        newSnippet
      );

      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMember: increment(1),
      });

      // perform batch writes
      await batch.commit();

      // Add current community to snippet
      setCommunityStateValue((prev) => ({
        ...prev,
        //append new snippet to old one
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  const leaveCommunity = async (communityId: string) => {
    try {
      const batch = writeBatch(firestore);
      batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets/${communityId}`));
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMember: increment(-1),
      });
      await batch.commit();
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter((item) => item.communityId !== communityId),
      }));
    } catch (error) {
      console.log("leaveCommunity error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    const getMysnippet = async () => {
      setLoading(true);
      try {
        //get the info from the snippets collections in the firebase
        const snippetDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`));
        // extract all the doc data in obj
        const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
        setCommunityStateValue((prev) => ({
          ...prev,
          mySnippets: snippets as CommunitySnippet[],
        }));
        console.log("here is the data:", snippets);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      }
    };
    getMysnippet();
  }, [user, setCommunityStateValue]);

  const getCommunityData = async (communityId: string) => {
    try {
      const communityDocRef = doc(firestore, "communities", communityId);
      const communityDoc = await getDoc(communityDocRef);
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: { id: communityDoc.id, ...communityDoc.data() } as Community,
      }));
    } catch (error: any) {
      console.log("getCommunityData Error", error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [],
      }));
    }
  }, [user]);

  useEffect(() => {
    const { communityId } = router.query;
    if (communityId && !communityStateValue.currentCommunity) {
      getCommunityData(communityId as string);
    }
  }, [router.query, communityStateValue.currentCommunity]);

  return {
    communityStateValue,
    onJoinLeaveCommunity,
    loading,
  };
};

export default useCommunityData;
