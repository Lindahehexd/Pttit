import { auth } from "@/firebase/clientApp";
import { defaultMenuItem } from "@/atoms/directoryMenuAtom";
import { Flex, Stack } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import AllCommunities from "@/components/Community/AllCommunities";
import HomeLayout from "@/components/Layout/HomeLayout";
import PersonalHome from "@/components/Community/PersonalHome";
import TopCommunities from "@/components/Community/TopCommunities";
import useDirectory from "@/hooks/useDirectory";
import Kanban from "@/components/Community/Kanban";

export default function Home() {
    
//   const { onSelectMenuItem } = useDirectory();

//   useEffect(() => {
//     onSelectMenuItem(defaultMenuItem);
//   }, []);

  return (
    <Flex align='center' justify='center' 
    bgImage="url(/images/8bitbg1.jpg)" 
    backgroundSize='cover' >
      <HomeLayout>
        {/* left */}
        <>
          <AllCommunities />
        </>
        {/* right */}
        <>
          <Stack spacing={7}>
            <TopCommunities />
            <Kanban />
            <PersonalHome />
          </Stack>
        </>
      </HomeLayout>
    </Flex>
  );
}
