import { Flex, Stack } from "@chakra-ui/react";
import Head from "next/head";
import AllCommunities from "@/components/Community/AllCommunities";
import HomeLayout from "@/components/Layout/HomeLayout";
import PersonalHome from "@/components/Community/PersonalHome";
import TopCommunities from "@/components/Community/TopCommunities";
import Kanban from "@/components/Community/Kanban";

export default function Home() {
  //   const { onSelectMenuItem } = useDirectory();

  //   useEffect(() => {
  //     onSelectMenuItem(defaultMenuItem);
  //   }, []);

  return (
    <>
      <Head>
        <title>PTTit</title>
        <meta
          name="description"
          content="PTTit結合PTT與Reddit，可以讓你建立看板，也能搜尋文章、查詢看板，甚至讓你推噓文，現在就成為PTTit的鄉民吧!"
        />
        <meta property="og:image" content="/images/pview.png" />
      </Head>
      <Flex align="center" justify="center" bgImage="url(/images/8bitbg1.jpg)" backgroundSize="cover">
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
    </>
  );
}
