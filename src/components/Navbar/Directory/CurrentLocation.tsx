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
    <Flex align="center" justify="space-between" w={{ base: "auto", lg: "150px" }}>
      <Flex align="center">
        <Link href={`/r/${communityStateValue.currentCommunity?.id}/`}>
          {communityStateValue.currentCommunity?.id === "Home" ? (
            ""
          ) : (
            <Text
              fontSize="sm"
              display={{ base: "none", lg: "flex" }}
              fontWeight="bold"
              _hover={{ textDecoration: "underline" }}
              ml={1}
            >
              {`當前看板  > `} {communityStateValue.currentCommunity?.id}{" "}
            </Text>
          )}
        </Link>
      </Flex>
    </Flex>
  );
};

export default CurrentLocation;
