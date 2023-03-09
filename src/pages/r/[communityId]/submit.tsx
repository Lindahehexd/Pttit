import PageContentLayout from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Posts/NewPostForm";
import { Box, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useRecoilValue } from "recoil";
import { communityState } from "@/atoms/communitiesAtom";
import PostRule from "@/components/Posts/PostRule";
import Head from "next/head";

const SubmitPostPage = () => {
  const [user] = useAuthState(auth);
  //   const communityStateValue = useRecoilValue(communityState);
  //   console.log("123456", communityStateValue);
  return (
<>
    <Head>
    <title>Create Post – PTTit</title>
    <meta
      name="description"
      content="PTTit結合PTT與Reddit，可以讓你建立看板，也能搜尋文章、查詢看板，甚至讓你推噓文，現在就成為PTTit的鄉民吧!"
      
    />
    <meta property="og:image" content="/images/pview.jpg" />
    </Head>

    <PageContentLayout>
      {/* left */}
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="gray.600">
          <Text fontSize='4xl' fontWeight={700}>發文</Text>
        </Box>
        {/* form */}
        {user && (
          <NewPostForm
            user={user}
            // for showing the imgurl on the post  p6 2242
            // communityImageURL={communityStateValue.currentCommunity?.imageURL}
          />
        )}
      </>
      {/* right */}
      <>
      <PostRule/>
      </>
    </PageContentLayout>
</>

  );
};

export default SubmitPostPage;
