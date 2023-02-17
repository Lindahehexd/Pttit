import { atomindex } from "@/atoms/commentAtom";
import { Button, Flex, Image, Input, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useRecoilState } from "recoil";

type ImageUplaodProps = {
  selectedFile?: string;
  onSelectImadge: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedFile: (value: string) => void;
};

const ImageUpload = ({ selectedFile, onSelectImadge, setSelectedFile }: ImageUplaodProps) => {
  const [tabIndex, setTabIndex] = useRecoilState(atomindex);

  const handleButtonClick = () => {
    setTabIndex(0);
  };

  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <Flex justify="center" align="center" w="100%" direction="column">
      {selectedFile ? (
        <>
          <Image src={selectedFile} maxW="400px" maxH="400px" alt="" />
          <Stack direction="row" mt={4}>
            <Button h="28px" onClick={handleButtonClick}>
              返回文章
            </Button>
            <Button variant="outline" h="28px" onClick={() => setSelectedFile("")}>
              移除
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          p={20}
          border="1px dashed"
          borderColor="gray.500"
          w="100%"
          borderRadius={4}
        >
          <Button h="28px" onClick={() => selectedFileRef.current?.click()}>
            上傳
          </Button>
          <Input type="file" ref={selectedFileRef} hidden onChange={onSelectImadge} />
        </Flex>
      )}
    </Flex>
  );
};

export default ImageUpload;
