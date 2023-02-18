import { Box, Button, Flex, Icon, Text, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import { Community, communityState } from "../../atoms/communitiesAtom";
// import useCommunityData from "../../hooks/useCommunityData";
import { useRecoilState, useSetRecoilState } from "recoil";
import useCommunityData from "@/hooks/useCommunityData";
import { RiEarthFill } from "react-icons/ri";
import { firestore } from "@/firebase/clientApp";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useState } from "react";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinLeaveCommunity, loading } = useCommunityData();
  const [about, setAbout] = useState("");
  /**
   * !!!Don't pass communityData boolean until the end
   * It's a small optimization!!!
   */
  //   const { communityStateValue, loading, error, onJoinLeaveCommunity } = useCommunityData(!!communityData);
  //   const isJoined = !!communityStateValue.mySnippets.find((item) => item.communityId === communityData.id);
  //  snippet is array , find if theres the id
  const isJoined = !!communityStateValue.mySnippets.find((item) => item.communityId === communityData.id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isloading, setisLoading] = useState(false);
  const [communityStateValue2, setCommunityStateValue2] = useRecoilState(communityState);


  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAbout(e.target.value);
  };



  const onUpdateAboutCommunity = async () => {
    try {
      setisLoading(true);
      const communityRef = doc(firestore, "communities", communityData.id);
      await updateDoc(communityRef, {
        communityInfo: about,
      });
      console.log("Document updated successfully.");

      // Fetch the updated community data from Firebase
      const updatedCommunityData = await getDoc(communityRef);
      setCommunityStateValue2((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          communityInfo: updatedCommunityData?.data()?.communityInfo,
        } as Community,
      }));

      console.log("cuuretn about", communityData.aboutCommunity);
    } catch (error: any) {
      console.log("update error", error);
    }
    // window.location.reload();
    setisLoading(false);
  };






  return (
    <Flex direction="column" width="100%" height="146px"  >
      <Box height="50%" bg="black"/>
      <Flex justifyContent="center" bg="gray.900" height="50%" >
        {/* maxW important  */}
        <Flex width="95%" maxW="860px" 
        // border="1px solid red"
        >
          {communityStateValue.currentCommunity?.imageURL ? (
            <Image
              borderRadius="full"
              boxSize="66px"
              src={communityStateValue.currentCommunity.imageURL}
              alt="Dan Abramov"
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
            />
          ) : (
            <Icon
              as={RiEarthFill}
              fontSize={64}
              position="relative"
              top={-3}
              color="blue.500"
              border="5px solid white"
              borderRadius="full"
              //look better with bg white
              bg="white"
            />
          )}

          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt" color="gray.400">
                {communityData.id} 
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                {communityData.communityInfo}
              </Text>


              <Text>
                {` 看板簡介:
               ${communityStateValue2.currentCommunity?.communityInfo} `}
              </Text>








             {/* update */}
             <Button variant="ghost" color="blue.500" onClick={onOpen}>
                        修改看板簡介
                      </Button>
                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>修改看板簡介</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <Text fontWeight="bold">修改看板簡介</Text>
                            <Input position="relative" value={about} size="sm" pl="22px" onChange={handleChange2} />
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              h="30px"
                              onClick={() => {
                                onUpdateAboutCommunity();
                                onClose();
                              }}
                              isLoading={loading}
                            >
                              修改
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>












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
                {isJoined ? "已加入" : "加入"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
