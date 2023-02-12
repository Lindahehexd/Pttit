import { Box, Button, Flex, Icon, Image, Skeleton, SkeletonCircle, Stack, Text } from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaReddit } from "react-icons/fa";
import { Community } from "../../atoms/communitiesAtom";
import { firestore } from "../../firebase/clientApp";
import useCommunityData from "../../hooks/useCommunityData";

type RecommendationsProps = {};

const AllCommunities: React.FC<RecommendationsProps> = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinLeaveCommunity } = useCommunityData();

  const getCommunityRecommendations = async () => {
    setLoading(true);
    try {
      const communityQuery = query(collection(firestore, "communities"), orderBy("numberOfMember", "desc"));
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
    <Flex direction="column" bg="gray.800" borderRadius={4} border="1px solid" borderColor="gray.600">
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="70px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/proffesor.jpg)"
        backgroundSize="cover"
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
          url('images/proffesor.jpg')"
      >
        <Text>所有看板</Text>
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
                  align="center"
                  fontSize="10pt"
                  borderBottom="1px solid"
                  borderColor="gray.600"
                  p={3}
                  fontWeight={600}
                  justifyContent="space-between"
                >
                  <Flex width="80%" align="center">
                    {/* <Flex mr={3}>
                      <Text mr={2}>{index + 1}</Text>
                    </Flex> */}
                    <Flex align="center" width="80%">
                      {item.imageURL ? (
                        <Image borderRadius="full" boxSize="28px" src={item.imageURL} mr={2} alt="" />
                      ) : (
                        <Icon as={FaReddit} fontSize={30} color="yellow.300" mr={2} />
                      )}
                      <Box w='30%'>
                      <Link href={`/r/${item.id}`}>
                        <Box _hover={{ textDecoration: "underline" }}>{`${item.id}`}</Box>
                      </Link>
                      </Box>
                 

                      <Text ml={7}> {item.aboutCommunity}</Text>
                      <Text ml={7}> @ {item.communityInfo}</Text>
                    </Flex>
                  </Flex>
                  <Flex right="10px">
                    <Button
                      height="22px"
                      fontSize="8pt"
                      onClick={() => {
                        onJoinLeaveCommunity(item, isJoined);
                      }}
                      variant={isJoined ? "outline" : "solid"}
                    >
                      {isJoined ? "Joined" : "Join"}
                    </Button>
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
export default AllCommunities;
