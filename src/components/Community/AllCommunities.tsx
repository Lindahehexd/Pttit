import { useEffect, useState } from "react";
import { Box, Button, Flex, Icon, Image, Skeleton, SkeletonCircle, Stack, Text } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { RiEarthFill } from "react-icons/ri";
import { Community } from "../../atoms/communitiesAtom";
import { firestore } from "../../firebase/clientApp";
import Link from "next/link";
import useCommunityData from "../../hooks/useCommunityData";

const AllCommunities = () => {
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
    <Flex direction="column" bg="gray.900" borderRadius={4} border="1px solid" borderColor="gray.600">
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="70px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/8bithome.webp)"
        backgroundSize="contain"
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
          url('images/8bitbg2.png')"
      >
        <Text fontSize="">所有看板</Text>
      </Flex>
      <Flex direction="column">
        {loading ? (
          <Stack mt={2} p={3} spacing={3}>
            <Flex align="center">
              <SkeletonCircle size="10" />
              <Skeleton ml={8} height="10px" width="80%" />
            </Flex>
            <Flex align="center">
              <SkeletonCircle size="10" />
              <Skeleton ml={8} height="10px" width="80%" />
            </Flex>
            <Flex align="center">
              <SkeletonCircle size="10" />
              <Skeleton ml={8} height="10px" width="80%" />
            </Flex>
            <Flex align="center">
              <SkeletonCircle size="10" />
              <Skeleton ml={8} height="10px" width="80%" />
            </Flex>
          </Stack>
        ) : (
          <>
            {communities.map((item, index) => {
              const isJoined = !!communityStateValue.mySnippets.find((snippet) => snippet.communityId === item.id);
              return (
                <Link href={`/r/${item.id}`}>
                <Flex
                  key={item.id}
                  align="center"
                  fontSize="10pt"
                  borderBottom="1px solid"
                  borderColor="gray.600"
                  p={3}
                  fontWeight={400}
                  justifyContent="space-between"
                  _hover={{ bg: "gray.600" }}
                >
                  <Flex width="85%" align="center">
                    <Flex mr={3} w="20px">
                      <Text mr={2}>{index + 1}</Text>
                    </Flex>
                    <Flex align="center" width="80%">
                      {item.imageURL ? (
                        <Image borderRadius="full" boxSize="28px" src={item.imageURL} mr={2} alt="" />
                      ) : (
                        <Icon as={RiEarthFill} fontSize={30} color="orange.200" mr={2} />
                      )}
                      <Box w="30%">
                        <Box
                          _hover={{ textDecoration: "underline" }}
                          fontSize={{ base: "14px", md: "16px", lg: "20px" }}
                        >{`${item.id}`}</Box>
                      </Box>

                      <Text ml={7} fontSize={{ base: "14px", md: "14px" }} _hover={{ textDecoration: "underline" }}>
                        @ {item.communityInfo}
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex right="10px">
                    <Button
                      height="22px"
                      fontSize="8pt"
                      onClick={(event) => {
                        event.preventDefault();
                        onJoinLeaveCommunity(item, isJoined);
                      }}
                      variant={isJoined ? "outline" : "solid"}
                    >
                      {isJoined ? "已加入" : "加入"}
                    </Button>
                  </Flex>
                </Flex>
               </Link>
              );
            })}
          </>
        )}
      </Flex>
    </Flex>
  );
};
export default AllCommunities;
