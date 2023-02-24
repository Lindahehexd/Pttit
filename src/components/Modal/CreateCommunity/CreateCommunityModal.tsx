import { auth, firestore } from "@/firebase/clientApp";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  Text,
  Input,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsPersonFill } from "react-icons/bs";
import { useRouter } from "next/router";

type CreateCommunityProps = {
  open: boolean;
  handleClose: () => void;
};

// to Communities

const CreateCommunityModal = ({ open, handleClose }: CreateCommunityProps) => {
  const [user] = useAuthState(auth);
  const [communities, setCommunities] = useState("");
  const [communitiesInfo, setCommunitiesInfo] = useState("");
  const [aboutCommunity, setAboutCommunity] = useState("");
  const [remain, setRemain] = useState(21);
  const [type, setType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 21) return;
    setCommunities(e.target.value);
    setRemain(21 - e.target.value.length);
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 21) return;
    setCommunitiesInfo(e.target.value);
  };

  const handleChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 21) return;
    setAboutCommunity(e.target.value);
  };

  const typeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.name);
  };

  const handleCommunity = async () => {
    if (error) setError("");
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communities) || communities.length < 3) {
      setError("看板名稱字數請介於3~21字，不得輸入任何符號，且只允許輸入字母、數字、及下劃線。");
      return;
    }
    setLoading(true);

    try {
      //firestor = db  中間是名稱, 名子對應input裡的value
      const communityDocRef = doc(firestore, "communities", communities);
      //transaction goal: if one fail , all fail
      await runTransaction(firestore, async (transaction) => {
        // check if exist
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, r/${communities} is taken . Try another.`);
        }
        //create the community
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMember: 1,
          privacyType: "public",
          communityInfo: communitiesInfo,
          aboutCommunity: aboutCommunity,
        });
        // create to user interface
        // add to > users collection > userid (document) >  add commnuitysnippet collection > add document as communities ( at sub collection )
        transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communities), {
          communityId: communities,
          isModerator: true,
        });
      });
      handleClose();
      router.push(`/r/${communities}`);
    } catch (error: any) {
      console.log(" handleCommunity error, error ");
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={open} onClose={handleClose} size="lg">
      {/*  */}
      <ModalOverlay />
      <ModalContent bg='gray.700'>
        <ModalHeader display="flex" flexDirection="column" fontSize="lg" p={3}>
          建立看板
        </ModalHeader>
        <Box px={3}>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" p="10px 0px">
            {/* 看板名稱 */}
            <Text fontWeight="bold">看板名稱</Text>
            <Text fontSize="sm" color='gray.400'>看板名稱請使用英文大小寫，設定完成後將無法修改</Text>

            <Input position="relative" value={communities} size="sm" pl="22px" onChange={handleChange} />
            <Text fontSize="sm" color={remain === 0 ? "red" : "gray.400"}>
              剩餘 {remain} 個字符
            </Text>
            <Text color="red.400" p={1} fontSize="sm">
              {error}
            </Text>
            {/* 社團介紹 */}
            <Text fontWeight="bold">社團介紹</Text>
            <Input position="relative" value={communitiesInfo} size="sm" pl="22px" onChange={handleChange2} />
            <Text fontSize="sm" color="gray.400">
              範例: [八卦] 這裡是八卦版，兔年行大運！！
            </Text>
            {/* 看板簡介 */}
            <Text fontWeight="bold" mt={2}>看板簡介</Text>
            <Input position="relative" value={aboutCommunity} size="sm" pl="22px" onChange={handleChange3} />
            <Text fontSize="sm" color="gray.400">
              看板簡介將會顯示於看板頁面
            </Text>
          </ModalBody>

          {/* 社團類型 */}
          <Box my={4}>
            <Text fontWeight="bold"> 社團類型 </Text>
            {/* checkbox */}
            <Stack spacing={3}>
              <Checkbox name="public" isChecked={type === "public"} onChange={typeChange}>
                <Flex align="center">
                  <Icon as={BsPersonFill} color="gray.500" mr={2} />
                  <Text fontSize="sm" mr={1}>
                    公開
                  </Text>
                  <Text fontSize="8px" color="gray.400" pt={1}>
                    任何人都可以瀏覽此看板。
                  </Text>
                </Flex>
              </Checkbox>
            </Stack>
          </Box>
        </Box>

        <ModalFooter bg="gray.500" borderRadius="0px 0px 10px 10px">
          <Button h="30px" mr={3} onClick={handleClose} colorScheme="blue">
            離開
          </Button>
          <Button h="30px" onClick={handleCommunity} isLoading={loading}>
            建立看板
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCommunityModal;
