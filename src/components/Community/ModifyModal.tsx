import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

// to Communities

const Testt = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAbout(e.target.value);
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
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
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button h="30px" onClick={() => {}} isLoading={loading}>
              修改
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Testt;
