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
  useDisclosure,
  Text,
  Input,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { doc, getDoc, runTransaction, serverTimestamp, setDoc, Transaction } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { useRouter } from "next/router";

type CreateCommunityProps = {
  open: boolean;
  handleClose: () => void;
};

// to Communities

const CreateCommunityModal = ({ open, handleClose }: CreateCommunityProps) => {
  const [user] = useAuthState(auth);
  const [communities, setCommunities] = useState("");
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

  const typeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.name);
  };

  const handleCommunity = async () => {
    if (error) setError("");
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communities) || communities.length < 3) {
      setError(
        "Communities name must be between 3-21 characters, and can only contain letters, numbers, or underscored"
      );
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
        });
        // create to user interface
        // add to > users collection > userid (document) >  add commnuitysnippet collection > add document as communities ( at sub collection )
        transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communities), {
          communityId: communities,
          isModerator: true,
        });
      });
      handleClose()
      router.push(`/r/${communities}`);
    } catch (error: any) {
      console.log(" handleCommunity error, error ");
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={open} onClose={handleClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" flexDirection="column" fontSize="lg" p={3}>
          建立看板
        </ModalHeader>
        <Box px={3}>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" p="10px 0px" border="1px solid red">
            <Text fontWeight="bold">Name</Text>
            <Text fontSize="sm">Communities names including capitalization can not be chnaged</Text>
            <Text position="relative" top="28px" left="10px" w="20px" color="gray.400">
              r/
            </Text>
            <Input position="relative" value={communities} size="sm" pl="22px" onChange={handleChange} />
            <Text fontSize="sm" color={remain === 0 ? "red" : "gray.500"}>
              {remain} Character remaining
            </Text>
            <Text color="red" p={1} fontSize="sm">
              {error}
            </Text>
          </ModalBody>
          <Box my={4}>
            <Text fontWeight="bold"> Community type</Text>
            {/* checkbox */}
            <Stack spacing={3}>
              <Checkbox name="public" isChecked={type === "public"} onChange={typeChange}>
                <Flex align="center">
                  <Icon as={BsPersonFill} color="gray.500" mr={2} />
                  <Text fontSize="sm" mr={1}>
                    Public
                  </Text>
                  <Text fontSize="8px" color="gray.500" pt={1}>
                    Anyone can view the post, and comment to this community
                  </Text>
                </Flex>
              </Checkbox>

              {/* <Checkbox name="restricted" isChecked={type === "restricted"} onChange={typeChange}>
                <Flex align="center">
                  <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                  <Text fontSize="sm" mr={1}>
                    Restricted
                  </Text>
                  <Text fontSize="8px" color="gray.500" pt={1}>
                    Anyone can view the post, but only approved users can post
                  </Text>
                </Flex>
              </Checkbox>

              <Checkbox name="private" isChecked={type === "private"} onChange={typeChange}>
                <Flex align="center">
                  <Icon as={HiLockClosed} color="gray.500" mr={2} />
                  <Text fontSize="sm" mr={1}>
                    Private
                  </Text>
                  <Text fontSize="8px" color="gray.500" pt={1}>
                    Only approved users can view and submit to this community
                  </Text>
                </Flex>
              </Checkbox> */}
            </Stack>
          </Box>
        </Box>

        <ModalFooter bg="gray.500" borderRadius="0px 0px 10px 10px">
          <Button
            // variant="outline"
            h="30px"
            mr={3}
            onClick={handleClose}
            colorScheme="blue"
          >
            Close
          </Button>
          <Button h="30px" onClick={handleCommunity} isLoading={loading}>
            Create Community
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCommunityModal;
