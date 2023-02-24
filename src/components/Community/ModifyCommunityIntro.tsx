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
  onUpdateCommunityIntro: () => void;
  about: string;
  onModalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  isOpen: boolean;
  onOpen: () => void;
  isLoading: boolean;
};

const ModifyCommunityInfo = ({
  onUpdateCommunityIntro,
  about,
  onModalChange,
  isOpen,
  onClose,
  onOpen,
  isLoading,
}: ModifyModalProps) => {
  return (
    <>
      <Icon ml={2} as={HiPencilAlt} onClick={onOpen} cursor="pointer"></Icon>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>修改【看板簡介】</ModalHeader>
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
            <Button h="30px" onClick={onUpdateCommunityIntro} isLoading={isLoading}>
              送出
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModifyCommunityInfo;
