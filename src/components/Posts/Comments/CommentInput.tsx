import AuthButtons from "@/components/Navbar/RightContent/AuthButtons";
import { Button, Divider, Flex, Icon, Spacer, Text, Textarea, useColorModeValue } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { atomindex } from "@/atoms/commentAtom";
import { AiFillDislike, AiFillLike, AiFillMessage } from "react-icons/ai";

type CommentInputProps = {
  commentText: string;
  setCommentText: (value: string) => void;
  createLoading: boolean;
  user?: User;
  onCreateComment: (comment: string) => void;
};

const CommentInput = ({ commentText, setCommentText, createLoading, user, onCreateComment }: CommentInputProps) => {
  const [tabIndex, setTabIndex] = useRecoilState<number>(atomindex);
  const maxLength = 45;
  const remainingChars = maxLength - commentText.length;

  const colors = useColorModeValue(["gray.200", "green.500", "red.800"], ["gray.800", "green.500", "red.600"]);
  const bg = colors[tabIndex];

  return (
    // container
    <Flex direction="column" mt={1}>
      {user ? (
        //outer
        <Flex direction="column">
          {/* 發表看法 */}
          <Text mb={1}>
            <span style={{ color: "#3182CE" }}>{user?.email?.split("@")[0]}</span> 發表你的看法
          </Text>
          {/* TAB */}
          <Tabs onChange={(tabIndex) => setTabIndex(tabIndex)} bg="gray.800" borderRadius="4px, 4px, 0px,">
            <TabList>
              <Tab color="white">
                <Icon as={AiFillMessage} color='gray.400' />
                <Text ml={2} fontSize="sm">
                  只加註解
                </Text>
              </Tab>
              <Tab color="white">
                <Icon as={AiFillLike} color="green.500" />
                <Text ml={2} fontSize="sm">
                  值得推薦
                </Text>
              </Tab>
              <Tab color="white">
                <Icon as={AiFillDislike} color="red.500" />
                <Text ml={2} fontSize="sm">
                  給他噓聲
                </Text>
              </Tab>
            </TabList>
            <TabPanels p={1}>
              <Textarea
                focusBorderColor="gray.600"
                _focus={{ bg: "gray.800" }}
                bg="black"
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                maxLength={45}
              ></Textarea>

              {/* 字數+送出 */}
              <Flex justify='space-between' pt={2}>
              <Flex> 還可輸入 {remainingChars} 字 </Flex>
              <Button
              mr={2}
                  height="26px"
                  disabled={!commentText.length}
                  isLoading={createLoading}
                  onClick={() => onCreateComment(commentText)}
                >
                  送出
                </Button>
              </Flex>
            </TabPanels>
          </Tabs>
          <Divider mt={2} />
        </Flex>
      ) : (
        <Flex align="center" justify="space-between" borderRadius={2} border="1px solid" borderColor="gray.500" p={4}>
          <Text fontWeight={600}>推文前請先登入</Text>
          <Flex>
            <AuthButtons />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default CommentInput;
