import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text, Input, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { HiPencilAlt } from "react-icons/hi";

// to Communities

type odifyModalProps = {
  onUpdateAboutCommunity: () => void;
  about: string;
  handleChange2: any;
  onClose: any
  isOpen:any
  onOpen:any
  loading:any
};

const ModifyModal = ({ onUpdateAboutCommunity, about, handleChange2, isOpen, onClose, onOpen , loading  }: odifyModalProps) => {

  return (
    <>
      < Icon ml={2} as={HiPencilAlt} onClick={onOpen} cursor='pointer' fontSize={22}>
      </Icon>
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
            <Button h="30px" onClick={onUpdateAboutCommunity} isLoading={loading}>
              修改
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModifyModal;
