import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text, Input, useDisclosure, Icon } from "@chakra-ui/react";
import { HiPencilAlt } from "react-icons/hi";

// to Communities

type odifyModalProps = {
  onUpdateCommunityIntro: () => void;
  about: string;
  handleChange2: any;
  onClose: any;
  isOpen: any;
  onOpen: any;
  isLoading: any 
};

const PenModal = ({ onUpdateCommunityIntro, about, handleChange2, isOpen, onClose, onOpen, isLoading }: any) => {

  return (
    <>
      < Icon ml={2} as={HiPencilAlt} onClick={onOpen} cursor='pointer'>
      </Icon>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>修改看板簡介</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input position="relative" value={about} size="sm" pl="22px" onChange={handleChange2}  placeholder="看板簡介"/>
          </ModalBody>
          <ModalFooter>
            <Button h="30px" onClick={onUpdateCommunityIntro} isLoading={isLoading}>
              送出
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PenModal;
