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
        fontSize="10px"
        borderRadius={4}
        placeholder="Title"
        _placeholder={{ color: "gray.500" }}
        _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "black" }}
      />
      <Textarea
        name="body"
        onChange={onChange}
        value={textInput.body}
        h="100%"
        fontSize="10px"
        borderRadius={4}
        placeholder="Text Body"
        _placeholder={{ color: "gray.500" }}
        _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "black" }}
      />
      <Flex p={3} justify="flex-end">
        <Button h="34px" px="30px" disabled={!textInput.title} onClick={handleCreatePost} isLoading={loading}>
          Post
        </Button>
      </Flex>
    </Stack>
  );
};

export default TextInput;
