import { authModalState } from "@/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import { customErrors } from "@/firebase/errors";
import { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const SignUp = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, userCred, loading, authError] = useCreateUserWithEmailAndPassword(auth);

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

  const createUserDoc = async (user: User) => {
    await addDoc(collection(firestore, "users"), JSON.parse(JSON.stringify(user)));
  };
  
  useEffect(() => {
  if(userCred)
  createUserDoc(userCred.user)
  }, [userCred])
  

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="電子信箱"
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
        placeholder="密碼"
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
      <Input
        required
        name="confirmpassword"
        placeholder="確認密碼"
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
        {error || customErrors[authError?.message as keyof typeof customErrors]}
      </Text>

      <Button w="100%" h="36px" my={2} type="submit" isLoading={loading}>
        註冊
      </Button>
      <Flex fontSize="sm" justifyContent="center">
        <Text mr={1}>已經是鄉民?</Text>
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
          登入
        </Text>
      </Flex>
    </form>
  );
};

export default SignUp;
