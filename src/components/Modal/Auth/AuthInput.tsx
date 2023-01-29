import { authModalState } from "@/atoms/authModalAtom";
import { Flex } from "@chakra-ui/react";
import React from "react";
import {useRecoilValue} from 'recoil'

type Props = {};

const AuthInput = (props: Props) => {
  const modalState = useRecoilValue(authModalState);
  return (
    <Flex direction="column" align="center" width="100%" mt={4}>
      {/* <Login />
      <Signup /> */}
    </Flex>
  );
};

export default AuthInput;
