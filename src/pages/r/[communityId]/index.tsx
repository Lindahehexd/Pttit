import { Community } from "@/atoms/communitiesAtom";
import CommunityNotFound from "@/components/Community/CommunityNotFound";
import CreatePostLink from "@/components/Community/CreatePostLink";
import Header from "@/components/Community/Header";
import PageContent from "@/components/Layout/PageContent";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import safeJsonStringify from "safe-json-stringify";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage = ({ communityData }: CommunityPageProps) => {
  //check the data contents
  console.log(communityData);
  //check if the community data is exist
  if (!communityData) return <CommunityNotFound />;
  // communityData.id refer to the community namne
  return (
    <>
      <Header communityData={communityData} />
      <div>index{communityData.id}</div>;
      
      <PageContent>

        {/* child 1  */}
        <>
        <div>LEft</div>
        <CreatePostLink/>
        </>
        {/* child 2  */}
        <>
        <div>Right</div>
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
