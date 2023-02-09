import { communityState } from "@/atoms/communitiesAtom";
import CreateCommunityModal from "@/components/Modal/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem, Text, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaReddit } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import MenuListItem from "./MenuListItem";

const Communities = () => {
  const [open, setOpen] = useState(false);
  //p5 25841
  const mySnippets = useRecoilValue(communityState).mySnippets;
  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} color="gray.500">
          My Communities
          {/*  check filter的東西有沒有包含 isModerator */}
          {mySnippets
            .filter((snippet) => snippet.isModerator)
            .map((snippet) => (
              <MenuListItem
                key={snippet.communityId}
                icon={FaReddit}
                displayText={`r/${snippet.communityId}`}
                link={`/r/${snippet.communityId}`}
                iconColor={"blue.500"}
                imageURL={snippet.imageURL!}
              />
            ))}
        </Text>
      </Box>
      <MenuItem w="100%" fontSize="sm" _hover={{ bg: "gray.500" }} onClick={() => setOpen(true)}>
        <Flex align="center">
          <Icon as={GrAdd} fontSize={20} mr={2} />
          <Flex> Create Community</Flex>
        </Flex>
      </MenuItem>
      {mySnippets.map((snippet) => (
        <MenuListItem
          key={snippet.communityId}
          icon={FaReddit}
          displayText={`r/${snippet.communityId}`}
          link={`/r/${snippet.communityId}`}
          iconColor={"blue.500"}
          imageURL={snippet.imageURL!}
        />
      ))}
    </>
  );
};

export default Communities;
