/* eslint-disable react/no-children-prop */
import { useState } from "react";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const inputValue = event.currentTarget.value;
      // assume the inputValue is the communityId
      router.push(`/r/[communityId]`, `/r/${inputValue}`);
      setInputValue(""); // clear the input value
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  return (
    <Flex
      flexGrow={1}
      mx={{ base: 2.5, sm: 2, md: 4, lg: 7 }}
      align="center"
      display={{ base: "flex", sm: "flex", md: "flex", lg: "flex" }}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" fontSize={[13,15]} mb={1} />} />
        <Input
          type="tel"
          placeholder="前往看板"
          _placeholder={{ color: "gray.400", fontSize: { base: "sm", md: "sm", lg: "md" } }}
          h="34px"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={inputValue}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
