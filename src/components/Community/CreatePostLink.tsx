import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import useDirectory from "@/hooks/useDirectory";
import { Flex, Icon, Input, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import { RiGhostSmileFill } from "react-icons/ri";
import { useSetRecoilState } from "recoil";

const CreatePostLink: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const { toggleMenuOpen } = useDirectory();

  const onClick = () => {
    const { communityId } = router.query;
    if (!user) {
        setAuthModalState({ open: true, view: "login" });
        return
      }
    // Could check for user to open auth modal before redirecting to submit
    if (communityId) {
      router.push(`/r/${router.query.communityId}/submit`);
      return;
    }
    // Open directory menu to select community to post to
    toggleMenuOpen();
  };
  
  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="blue.900"
      height="56px"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.700"
      p={2}
      mb={4}
    >

          <Icon as={RiGhostSmileFill} fontSize={36} color="yellow.300" mr={4} />
          <Input
            placeholder="發表文章"
            fontSize="sm"
            _placeholder={{ color: "gray.500" }}
            _hover={{
              bg: "gray.400",
              border: "1px solid",
              borderColor: "blue.500",
            }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500",
            }}
            bg="gray.300"
            // borderColor="gray.200"
            height="36px"
            borderRadius={4}
            mr={4}
            onClick={onClick}
          />
          <Icon as={IoImageOutline} fontSize={24} mr={4} color="gray.400" cursor="pointer" />
          <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" />{" "}

    </Flex>
  );
};
export default CreatePostLink;
