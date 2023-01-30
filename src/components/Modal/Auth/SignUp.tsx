import { authModalState } from "@/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { customErrors } from "@/firebase/errors";

const SignUp = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, authError]: any = useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) setError("");
    if (signUpForm.password !== signUpForm.confirmpassword) {
      setError("password do not match");
      return;
    }
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
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
        bg="gray.50"
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
        bg="gray.50"
      />
      <Input
        required
        name="confirmpassword"
        placeholder="confirmpassword"
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
        bg="gray.50"
      />

      {error && (
        <Text textAlign="center" fontWeight="bold" color="red.500">
          {error}
        </Text>
      )}


      <Button w="100%" h="36px" my={2} type="submit" isLoading={loading}>
        Signup
      </Button>
      <Flex fontSize="sm" justifyContent="center">
        <Text mr={1}>Already a redditer?</Text>
        <Text
          color="blue.500"
          fontWeight="bold"
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          LOG IN
        </Text>
      </Flex>
    </form>
  );
};

export default SignUp;
