import PageContentLayout from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Posts/NewPostForm";
import { Box, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useRecoilValue } from "recoil";
import { communityState } from "@/atoms/communitiesAtom";

const SubmitPostPage = () => {
  const [user] = useAuthState(auth);
  //   const communityStateValue = useRecoilValue(communityState);
  //   console.log("123456", communityStateValue);
  return (
    <PageContentLayout>
      {/* left */}
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Create a Post</Text>
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
      <></>
    </PageContentLayout>
  );
};

export default SubmitPostPage;
