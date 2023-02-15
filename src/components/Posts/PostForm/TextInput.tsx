import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React from "react";

type TextInputProps = {
  textInput: {
    title: string;
    body: string;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInput = ({ textInput, onChange, handleCreatePost, loading }: TextInputProps) => {
  return (
    <Stack spacing={3} w="100%">
      <Input
        name="title"
        onChange={onChange}
        value={textInput.title}
        fontSize="md"
        borderRadius={4}
        placeholder="標題"
        _placeholder={{ color: "gray.500" }}
        _focus={{ outline: "none", bg: "gray.700", border: "1px solid", borderColor: "black" }}
      />
      <Textarea
        name="body"
        onChange={onChange}
        value={textInput.body}
        h="100%"
        fontSize="md"
        borderRadius={4}
        placeholder="內文"
        _placeholder={{ color: "gray.500" }}
        _focus={{ outline: "none", bg: "gray.700", border: "1px solid", borderColor: "black" }}
      />
      <Flex p={3} justify="flex-end">
        <Button h="34px" px="30px" disabled={!textInput.title} onClick={handleCreatePost} isLoading={loading}>
          發文
        </Button>
      </Flex>
    </Stack>
  );
};

export default TextInput;
