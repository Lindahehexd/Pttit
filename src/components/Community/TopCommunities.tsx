import { Box, Button, Flex, Icon, Image, Skeleton, SkeletonCircle, Stack, Text } from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiEarthFill, RiEmotionFill } from "react-icons/ri";
import { Community } from "../../atoms/communitiesAtom";
import { firestore } from "../../firebase/clientApp";
import useCommunityData from "../../hooks/useCommunityData";

type RecommendationsProps = {};

const TopCommunities: React.FC<RecommendationsProps> = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinLeaveCommunity } = useCommunityData();

  const getCommunityRecommendations = async () => {
    setLoading(true);
    try {
      const communityQuery = query(collection(firestore, "communities"), orderBy("numberOfMember", "desc"), limit(5));
      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Community[];
      setCommunities(communities);
    } catch (error: any) {
      console.log("getCommunityRecommendations error", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  return (
    <Flex direction="column" bg="gray.900" borderRadius={4} border="1px solid" borderColor="gray.600">
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="70px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/8bitbg2.png)"
        backgroundSize="cover"
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
        url(/images/8bitbg2.png)"
      >
        熱門看板
      </Flex>
      <Flex direction="column">
        {loading ? (
          <Stack mt={2} p={3}>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
          </Stack>
        ) : (
          <>
            {communities.map((item, index) => {
              const isJoined = !!communityStateValue.mySnippets.find((snippet) => snippet.communityId === item.id);
              return (
                <Flex
                  key={item.id}
                  bg="gray.900"
                  position="relative"
                  align="center"
                  fontSize="10pt"
                  borderBottom="1px solid"
                  borderColor="gray.600"
                  p="10px 12px"
                  fontWeight={600}
                  _hover={{ bg: "gray.600" }}
                >
                  <Flex width="80%" align="center">
                    <Flex width="15%">
                      <Text mr={2}>{index + 1}</Text>
                    </Flex>
                    <Flex align="center" width="80%">
                      {item.imageURL ? (
                        <Image borderRadius="full" boxSize="28px" src={item.imageURL} mr={2} />
                      ) : (
                        <Icon as={RiEarthFill} fontSize={25} color="blue.400" mr={2} />
                      )}

                      <Link href={`/r/${item.id}`}>
                        <Text _hover={{ textDecoration: "underline" }}>{`r/${item.id}`}</Text>
                      </Link>
                    </Flex>

                    <Box position="absolute" right="10px">
                      <Button
                        height="22px"
                        fontSize="8pt"
                        onClick={(event) => {
                          event.stopPropagation();
                          onJoinLeaveCommunity(item, isJoined);
                        }}
                        variant={isJoined ? "outline" : "solid"}
                      >
                        {isJoined ? "已加入" : "加入"}
                      </Button>
                    </Box>
                  </Flex>
                </Flex>
              );
            })}
          </>
        )}
      </Flex>
    </Flex>
  );
};
export default TopCommunities;
