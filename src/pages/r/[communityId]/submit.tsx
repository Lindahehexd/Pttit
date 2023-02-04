import PageContentLayout from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Posts/NewPostForm";
import { Box, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

type Props = {};

const SubmitPostPage: React.FC<Props> = (props: Props) => {
  const [user] = useAuthState(auth);

  return (
    <PageContentLayout>
      {/* left */}
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text>Createff a Post</Text>
        </Box>
        {/* form */}
        {user && <NewPostForm  user={user}/>}
      </>
      {/* right */}
      <></>
    </PageContentLayout>
  );
};

export default SubmitPostPage;
