import { useState } from "react";
import { Flex, Stack, Button } from "@chakra-ui/react";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { authModalState } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import CreateCommunityModal from "@/components/Modal/CreateCommunity/CreateCommunityModal";

const Kanban = () => {
  const [user, loading, error] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Flex direction="column" borderRadius={4} cursor="pointer" p="1px" border="1px solid" borderColor="gray.600">
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Flex
        mb={2}
        bgImage={user ? "url(/images/pttlogin3.png)" : "url(/images/pttlogin2.png)"}
        backgroundSize="cover"
        h="150px"
      ></Flex>
      <Stack spacing={1} fontSize="9pt" pl={2}></Stack>
      <Flex w="100%" align="center" justify="center">
        {user ? (
          <Button
            w="80%"
            alignItems="center"
            justifyContent="center"
            height="30px"
            mb={2}
            bg='orange.400'
            _hover={{bg:'orange.300'}}
            onClick={() => setOpen(true)}
          >
            建立看板
          </Button>
        ) : (
          <Button
            w="80%"
            alignItems="center"
            justifyContent="center"
            height="30px"
            mb={2}
            onClick={() => setAuthModalState({ open: true, view: "signup" })}
          >
            成為鄉民
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
export default Kanban;
