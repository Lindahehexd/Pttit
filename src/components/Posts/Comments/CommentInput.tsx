import AuthButtons from "@/components/Navbar/RightContent/AuthButtons";
import { Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";

type CommentInputProps = {
  commentText: string;
  setCommentText: (value: string) => void;
  createLoading: boolean;
  user?: User;
  onCreateComment: (comment: string) => void;
};

const CommentInput = ({ commentText, setCommentText, createLoading, user, onCreateComment }: CommentInputProps) => {
  return (
    <Flex direction="column" position="relative">
      {user ? (
        <>
          <Text mb={1}>
            <span style={{ color: "#3182CE" }}>{user?.email?.split("@")[0]}</span> 發表你的看法
          </Text>
          <Textarea
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            // placeholder=""。
            fontSize="10pt"
            borderRadius={4}
            minHeight="160px"
            pb={10}
            _placeholder={{ color: "gray.500" }}
            _focus={{
              outline: "none",
            //   bg: "white",
              border: "1px solid black",
            }}
          />
          <Flex
            position="absolute"
            left="1px"
            right={0.1}
            bottom="1px"
            justify="flex-end"
            bg="gray.500"
            p="6px 8px"
            borderRadius="0px 0px 4px 4px"
          >
            <Button
              height="26px"
              disabled={!commentText.length}
              isLoading={createLoading}
              onClick={() => onCreateComment(commentText)}
            >
              送出
            </Button>
          </Flex>
        </>
      ) : (
        <Flex align="center" justify="space-between" borderRadius={2} border="1px solid" borderColor="gray.100" p={4}>
          <Text fontWeight={600}>推文前請先登入</Text>
          <AuthButtons />
        </Flex>
      )}
    </Flex>
  );
};

export default CommentInput;
