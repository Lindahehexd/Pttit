import { authModalState } from "@/atoms/authModalAtom";
import { Community, communityState } from "@/atoms/communitiesAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import {
  Flex,
  Box,
  Text,
  Stack,
  Divider,
  Icon,
  Button,
  Image,
  Spinner,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { RiCakeLine, RiEarthFill } from "react-icons/ri";
import { useSetRecoilState } from "recoil";

type AboutProps = {
  communityData: Community;
};

const About = ({ communityData }: AboutProps) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const [uploadingImage, setUploadingImage] = useState(false);
  const setAuthModalState = useSetRecoilState(authModalState);
  const setCommunityStateValue = useSetRecoilState(communityState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAbout(e.target.value);
  };

  const onAbout = () => {
    const { communityId } = router.query;
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    // Could check for user to open auth modal before redirecting to submit
    if (communityId) {
      router.push(`/r/${router.query.communityId}/submit`);
    }
  };

  const onUploadImg = async () => {
    if (!selectedFile) return;
    setUploadingImage(true);
    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadUrL = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadUrL,
      });

      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadUrL,
        } as Community,
      }));
    } catch (error: any) {
      console.log("upload error", error);
    }
    setUploadingImage(false);
  };

  const onUpdateAboutCommunity = async () => {
    try {
      setLoading(true);
      const communityRef = doc(firestore, "communities", communityData.id);
      await updateDoc(communityRef, {
        aboutCommunity: about,
      });
      console.log("Document updated successfully.");

      // Fetch the updated community data from Firebase
      const updatedCommunityData = await getDoc(communityRef);
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          aboutCommunity: updatedCommunityData?.data()?.aboutCommunity,
        } as Community,
      }));

      console.log("cuuretn about", communityData.aboutCommunity);
    } catch (error: any) {
      console.log("update error", error);
    }
    window.location.reload();
    setLoading(false);
  };

  //   console.log("communityData", communityData);
  return (
    <Box position="sticky" top="14px">
      {/* top */}
      <Flex bg="blue.900" color="white" p={3} borderRadius="4px 4px 0px 0px">
        <Text> 關於看板 </Text>
      </Flex>
      {/* remain */}
      <Flex direction="column" p={3} bg={"whiteAlpha.200"} borderRadius="0px 0px 4px 4px">
        <Stack>
          <Flex w="100%" p={2}>
            <Flex flexGrow={1} maxWidth="300px">
              <Text>
                {` 看板簡介:
               ${communityData.aboutCommunity} `}
              </Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex w="100%" p={2}>
            <Flex flexGrow={1}>
              <Text>
                人數: {""} {communityData.numberOfMember}
              </Text>
            </Flex>
          </Flex>
          <Divider />
          {/* create at  */}
          <Flex align="center" flexGrow={1} w="100%" p={2}>
            <Icon as={RiCakeLine} mr={2} />
            <Text>
              於 {""}
              {communityData.createdAt
                ? moment(new Date(communityData.createdAt.seconds * 1000)).format("YYYY/MM/DD")
                : ""}{" "}
              建立
            </Text>
          </Flex>
          {/* link button */}
          <Button mt={2} h="38px" w="100%" onClick={onAbout}>
            發帖
          </Button>
          {/* if you are admin */}
          {user?.uid === communityData.creatorId && (
            <>
              <Divider />
              <Stack spacing={1} fontSize="10px">
                <Text fontWeight={600}> 您是本版版主</Text>
                <Flex align="center" justify="space-between">
                  {selectedFile && uploadingImage ? (
                    <Spinner />
                  ) : (
                    <>
                      <Text
                        color="blue.500"
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                        onClick={() => selectedFileRef.current?.click()}
                      >
                        更換圖片
                      </Text>

                      {/* update */}
                      <Button variant='ghost' color='blue.500' onClick={onOpen}>修改看板簡介</Button>
                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Modal Title</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <Text fontWeight="bold">修改看板簡介</Text>
                            <Input position="relative" value={about} size="sm" pl="22px" onChange={handleChange2} />
                          </ModalBody>
                          <ModalFooter>
                            <Button h="30px" onClick={onUpdateAboutCommunity} isLoading={loading}>
                              修改
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </>
                  )}

                  {/* show the image of community */}

                  {selectedFile ? (
                    <Image src={selectedFile} borderRadius="full" boxSize="40px" alt="" />
                  ) : (
                    <Icon as={RiEarthFill} fontSize={40} color="blue.500" mr={2} />
                  )}
                </Flex>
                {/* check if the img is uplaoded or not  */}
                {selectedFile && (
                  <Text
                    color="blue.500"
                    cursor="pointer"
                    onClick={onUploadImg}
                    _hover={{ textDecoration: "underline" }}
                  >
                    儲存變更
                  </Text>
                )}
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  hidden
                  ref={selectedFileRef}
                  onChange={onSelectFile}
                />
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default About;
function setRefresh(arg0: boolean) {
  throw new Error("Function not implemented.");
}
