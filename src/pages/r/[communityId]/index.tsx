import { Community, communityState } from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import About from "@/components/Community/About";
import CommunityNotFound from "@/components/Community/CommunityNotFound";
// import CreatePostLink from "@/components/Community/CreatePostLink";
import Header from "@/components/Community/Header";
import PageContent from "@/components/Layout/PageContent";
import Posts from "@/components/Posts/Posts";
import safeJsonStringify from "safe-json-stringify";
import Head from "next/head";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage = ({ communityData }: CommunityPageProps) => {
  //   console.log("here is commupage data", communityData);
  const setCommunityStateValue = useSetRecoilState(communityState);
  // when render , pass the data to other pages
  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, [communityData]);

  //check the data contents
  //   console.log(communityData);
  //check if the community data is exist
  if (!communityData) return <CommunityNotFound />;
  // communityData.id refer to the community namne

  return (
    <>
      <Head>
        <title>{communityData.id} – PTTit</title>
        <meta
          name="description"
          content="PTTit結合PTT與Reddit，可以讓你建立看板，也能搜尋文章、查詢看板，甚至讓你推噓文，現在就成為PTTit的鄉民吧!"
        />
        <meta property="og:image" content="/images/pview.png" />
      </Head>

      <Header communityData={communityData} />
      <PageContent>
        {/* child 1  ps . left */}
        <>
          {/* <CreatePostLink /> */}
          <Posts communityData={communityData} />
        </>
        {/* child 2  ps . right */}
        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </>
  );
};

// think of prebuilding the page
// https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get the community data and pass to the clent component

  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      // take the dynamic url
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      // this is what next is going to pass to client( there is a props) ,  dada is a firebase func  ==> communityDoc.data()
      props: {
        //inorder to retrieve the id , declaring the id first
        communityData: communityDoc.exists()
          ? JSON.parse(safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }))
          : "",
      },
    };
  } catch (error) {
    // Could create error page here
    console.log("getServerSideProps error - [community]", error);
  }
}

export default CommunityPage;
