import { authModalState } from "@/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

const Login = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    passowrd: "",
  });

  const onSubmit = () => {};

  
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      //update the state, name為下面input中的name 這樣就能對應到
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        mb={2}
        onChange={onChange}
        fontSize="sm"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          // bg:'white',
          bg: "gray.600",
          border: "1px solid",
          borderColor: "blue.500",
        }}
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize="sm"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          // bg:'white',
          bg: "gray.600",
          border: "1px solid",
          borderColor: "blue.500",
        }}
      />
      <Button w="100%" h="36px" my={2} type="submit">
        Log in
      </Button>
      <Flex fontSize="sm" justifyContent="center">
        <Text mr={1}>New here?</Text>
        <Text
          color="blue.500"
          fontWeight="bold"
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};

export default Login;
