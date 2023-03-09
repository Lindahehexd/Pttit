import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Icon,
} from "@chakra-ui/react";
import { HiPencilAlt } from "react-icons/hi";

// to Communities

type ModifyModalProps = {
  onUpdateAboutCommunity: () => void;
  about: string;
  onModalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  isOpen: boolean;
  onOpen: () => void;
  loading: boolean;
};

const ModifyAboutCommunity = ({
  onUpdateAboutCommunity,
  about,
  onModalChange,
  isOpen,
  onClose,
  onOpen,
  loading,
}: ModifyModalProps) => {
  return (
    <>
      <Icon ml={2} as={HiPencilAlt} onClick={onOpen} cursor="pointer" fontSize={22}></Icon>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>修改【關於看板】</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              position="relative"
              value={about}
              size="sm"
              pl="22px"
              onChange={onModalChange}
              placeholder="輸入內容..."
              _hover={{
                // bg: "gray.400",
                border: "1px solid",
                borderColor: "blue.500",
              }}
              _focus={{
                outline: "none",
                bg: "gray.600",
                border: "1px solid",
                borderColor: "blue.500",
              }}
            />
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

export default ModifyAboutCommunity;
