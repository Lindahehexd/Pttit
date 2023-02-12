import AuthButtons from "@/components/Navbar/RightContent/AuthButtons";
import { Button, Flex, Text, Textarea, useColorModeValue } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { atomindex } from "@/atoms/commentAtom";

type CommentInputProps = {
  commentText: string;
  setCommentText: (value: string) => void;
  createLoading: boolean;
  user?: User;
  onCreateComment: (comment: string) => void;
};

const CommentInput = ({ commentText, setCommentText, createLoading, user, onCreateComment }: CommentInputProps) => {
  const [tabIndex, setTabIndex] = useRecoilState<number>(atomindex);

  const colors = useColorModeValue(["gray.200", "green.500", "red.800"], ["gray.800", "green.500", "red.600"]);
  const bg = colors[tabIndex];

  return (
    // container
    <Flex direction="column">
      {user ? (
        //outer
        <Flex direction="column">
          {/* 發表看法 */}
          <Text mb={1}>
            <span style={{ color: "#3182CE" }}>{user?.email?.split("@")[0]}</span> 發表你的看法
          </Text>
          {/* TAB */}
          <Tabs onChange={(tabIndex) => setTabIndex(tabIndex)} bg='gray.800'>
            <TabList>
              <Tab color="white">只加註解</Tab>
              <Tab color="white">值得推薦</Tab>
              <Tab color="white">給他噓聲</Tab>
            </TabList>
            <TabPanels p={1}>
              <Textarea
                focusBorderColor="gray.600"
                _focus={{ bg: "gray.800" }}
                bg="black"
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
              ></Textarea>
            </TabPanels>
          </Tabs>
          {/* 送出 */}
          <Flex position="relative" justify="flex-end" bg={bg} p="6px 8px" borderRadius="0px 0px 4px 4px">
            <Button
              height="26px"
              disabled={!commentText.length}
              isLoading={createLoading}
              onClick={() => onCreateComment(commentText)}
            >
              送出
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex align="center" justify="space-between" borderRadius={2} border="1px solid" borderColor="gray.100" p={4}>
          <Text fontWeight={600}>推文前請先登入</Text>
          <AuthButtons />
        </Flex>
      )}
      {/* 
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
            minHeight="120px"
            _placeholder={{ color: "gray.500" }}
            _focus={{
              outline: "none",
              //   bg: "white",
              border: "1px solid black",
            }}
          />

          <Flex bottom="1px" justify="flex-end" bg="gray.500" p="6px 8px" borderRadius="0px 0px 4px 4px">
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
      )} */}
    </Flex>
  );
};

export default CommentInput;
