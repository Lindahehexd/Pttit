import { Community, communityState } from "@/atoms/communitiesAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import { Flex, Box, Text, Stack, Divider, Icon, Button, Image, Spinner, Input } from "@chakra-ui/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaReddit } from "react-icons/fa";
import { RiCakeLine } from "react-icons/ri";
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
  const setCommunityStateValue = useSetRecoilState(communityState);

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
            <Flex flexGrow={1} maxWidth='300px'>
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
          <Link href={`/r/${router.query.communityId}/submit`}>
            <Button mt={2} h="38px" w="100%">
              發帖
            </Button>
          </Link>
          {/* if you are admin */}
          {user?.uid === communityData.creatorId && (
            <>
              <Divider />
              <Stack spacing={1} fontSize="10px">
                <Text fontWeight={600}> Admin</Text>
                <Flex align="center" justify="space-between">
                  {selectedFile && uploadingImage ? (
                    <Spinner />
                  ) : (
                    <Text
                      color="blue.500"
                      cursor="pointer"
                      _hover={{ textDecoration: "underline" }}
                      onClick={() => selectedFileRef.current?.click()}
                    >
                      更換圖片
                    </Text>
                  )}

                  {/* show the image of community */}

                  {selectedFile ? (
                    <Image src={selectedFile} borderRadius="full" boxSize="40px" alt="" />
                  ) : (
                    <Icon as={FaReddit} fontSize={40} color="brand.100" mr={2} />
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
