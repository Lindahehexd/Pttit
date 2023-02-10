import { authModalState } from "@/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { customErrors } from "@/firebase/errors";

const Login = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password)
    console.log(user);
  };

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

      <Text textAlign="center" mt={2} fontSize="sm" color="red.500">
        {customErrors[error?.message as keyof typeof customErrors]}
      </Text>

      <Button w="100%" h="36px" my={2} type="submit" isLoading={loading}>
        Log in
      </Button>
      
      <Flex justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize="9pt"
          color="blue.500"
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: 'resetPassword',
            }))
          }
        >
          Reset
        </Text>
      </Flex>

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
          註冊
        </Text>
      </Flex>
    </form>
  );
};

export default Login;
