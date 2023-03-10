import { Community, communityState } from "@/atoms/communitiesAtom";
import { Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import Link from "next/link";


const CurrentLocation = () => {
  const communityStateValue = useRecoilValue(communityState);
  const [currentState, setCurrentState] = useRecoilState(communityState);
  const router = useRouter();
//   console.log("com", communityStateValue);

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
      h="100%"
      align="center"
      _hover={{ bg: "gray.500" }}
      display={{base:'none', sm:'flex', md:'flex'}}
    >
      <Flex align="center">
        <Link href={`/r/${communityStateValue.currentCommunity?.id}/`}>
          {communityStateValue.currentCommunity?.id === "Home" ? (
            <Flex hidden></Flex>
          ) : (
            <Flex  align="center" h="100%">
              <Text
                display={{ base: "flex", lg: "flex" }}
                fontSize="sm"
                fontWeight={700}
              >{`看板 > ${communityStateValue.currentCommunity?.id}`}</Text>
            </Flex>
          )}
        </Link>
      </Flex>
    </Flex>
  );
};

export default CurrentLocation;
