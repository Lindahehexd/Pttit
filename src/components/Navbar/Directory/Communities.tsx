import { communityState } from "@/atoms/communitiesAtom";
import CreateCommunityModal from "@/components/Modal/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem, Text, Box } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaReddit } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { RiEarthFill } from "react-icons/ri";
import { TiHome } from "react-icons/ti";
import { useRecoilValue } from "recoil";
import MenuListItem from "./MenuListItem";

const Communities = () => {
  const [open, setOpen] = useState(false);
  //p5 25841
  const mySnippets = useRecoilValue(communityState).mySnippets;
  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Link href='/'>
      <MenuItem w="100%" fontSize="sm" _hover={{ bg: "gray.500" }} >
        <Flex align="center">
          <Icon as={TiHome} fontSize={20} mr={2} color="white" />
          <Flex> 回到首頁</Flex>
        </Flex>
      </MenuItem>
      </Link>
      <Box mt={1}>
        <Text pl={3} mb={1} color="gray.500">
          我的看板
        </Text>
        <MenuItem w="100%" fontSize="sm" _hover={{ bg: "gray.500" }} onClick={() => setOpen(true)}>
          <Flex align="center">
            <Icon as={GrAdd} fontSize={20} mr={2} color="white" />
            <Flex> 建立看板</Flex>
          </Flex>
        </MenuItem>
        {/*  check filter的東西有沒有包含 isModerator */}
        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet) => (
            <MenuListItem
              key={snippet.communityId}
              icon={RiEarthFill}
              displayText={`${snippet.communityId}`}
              link={`/r/${snippet.communityId}`}
              iconColor={"orange.300"}
              imageURL={snippet.imageURL!}
            />
          ))}
      </Box>

      <Box mb={4}>
        <Text pl={3} mb={1} color="gray.500">
          我的最愛
        </Text>
  
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={RiEarthFill}
            displayText={`${snippet.communityId}`}
            link={`/r/${snippet.communityId}`}
            iconColor={"blue.500"}
            imageURL={snippet.imageURL!}
          />
        ))}
      </Box>
    </>
  );
};

export default Communities;
