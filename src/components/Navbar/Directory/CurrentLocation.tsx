import { Community, communityState } from "@/atoms/communitiesAtom";
import useDirectory from "@/hooks/useDirectory";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const CurrentLocation = () => {
  const communityStateValue = useRecoilValue(communityState);
  const [currentState, setCurrentState] = useRecoilState(communityState);
  const router = useRouter();
  console.log("com", communityStateValue);

  useEffect(() => {
    if (router.pathname === "/") {
      setCurrentState((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          id: "Home",
        } as Community,
      }));
    }
  }, [router.pathname]);

  return (
    <Flex
      align="center"
      justify="space-between"
      //  bg='teal'
    >
      <Flex align="center">
        <Link href={`/r/${communityStateValue.currentCommunity?.id}/`}>
          {communityStateValue.currentCommunity?.id === "Home" ? (
            <Flex hidden></Flex>
          ) : (
            <Flex ml={3} align="center">
              <Text fontSize="sm">{`看板 > `}</Text>
              <Text display={{ base: "none", lg: "flex" }} _hover={{ textDecoration: "underline" }}>
                {communityStateValue.currentCommunity?.id}{" "}
              </Text>
            </Flex>
          )}
        </Link>
      </Flex>
    </Flex>
  );
};

export default CurrentLocation;
