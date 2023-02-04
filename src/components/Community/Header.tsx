import React from "react";
import { Box, Button, Flex, Icon, Text, Image } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import { Community, communityState } from "../../atoms/communitiesAtom";
// import useCommunityData from "../../hooks/useCommunityData";
import { useSetRecoilState } from "recoil";
import useCommunityData from "@/hooks/useCommunityData";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinLeaveCommunity, loading } = useCommunityData();
  /**
   * !!!Don't pass communityData boolean until the end
   * It's a small optimization!!!
   */
  //   const { communityStateValue, loading, error, onJoinLeaveCommunity } = useCommunityData(!!communityData);
  //   const isJoined = !!communityStateValue.mySnippets.find((item) => item.communityId === communityData.id);
  //  snippet is array , find if theres the id 
  const isJoined = !!communityStateValue.mySnippets.find((item) => item.communityId === communityData.id);

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.400" />
      <Flex justifyContent="center" bg="white" height="50%">
        {/* maxW important  */}
        <Flex width="95%" maxW="860px" border="1px solid red">
          {/* IMAGE URL IS ADDED AT THE VERY END BEFORE DUMMY DATA - USE ICON AT FIRST */}
          {/* {communityStateValue.currentCommunity.imageURL ? ( */}
          {/* <Image
              borderRadius="full"
              boxSize="66px"
            //   src={communityStateValue.currentCommunity.imageURL}
              alt="Dan Abramov"
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
            /> */}
          {/* ) : ( */}
          <Icon
            as={FaReddit}
            fontSize={64}
            position="relative"
            top={-3}
            color="blue.500"
            border="5px solid white"
            borderRadius="50%"
            //look better with bg white
            bg="white"
          />
          {/* )} */}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt" color="blackAlpha.900">
                {communityData.id} 123
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                r/{communityData.id}
              </Text>
            </Flex>
            <Flex>
              <Button
                variant={isJoined ? "outline" : "solid"}
                height="30px"
                pr={6}
                pl={6}
                isLoading={loading}
                onClick={() => onJoinLeaveCommunity(communityData, isJoined)}
                // isLoading={loading}
              >
                {isJoined ? "Joined" : "Join"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
