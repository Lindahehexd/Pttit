import { defaultMenuItem } from "@/atoms/directoryMenuAtom";
import AllCommunities from "@/components/Community/AllCommunities";
import PersonalHome from "@/components/Community/PersonalHome";
import Premium from "@/components/Community/Premium";
import TopCommunities from "@/components/Community/TopCommunities";
import PageContentLayout from "@/components/Layout/PageContent";
import { auth } from "@/firebase/clientApp";
import useDirectory from "@/hooks/useDirectory";
import { Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const { onSelectMenuItem } = useDirectory();
  const [user, loadingUser] = useAuthState(auth);

  useEffect(() => {
    onSelectMenuItem(defaultMenuItem);
  }, []);

  return (
    <PageContentLayout>
      <>
        <AllCommunities />
      </>
      {/* right */}
      <>
        <Stack spacing={7}>
          <TopCommunities />
          <Premium />
          <PersonalHome />
        </Stack>
      </>
    </PageContentLayout>
  );
}
