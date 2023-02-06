/* eslint-disable react/no-children-prop */
import { Flex, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

type Props = {};

const SearchInput: React.FC<Props> = () => {
  const router = useRouter();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const inputValue = event.currentTarget.value;
      // assume the inputValue is the communityId
      router.push(`/r/[communityId]`, `/r/${inputValue}`);
    }
  };

  return (
    <Flex flexGrow={1} mx={2} align="center">
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" mb={1} />} />
        <Input type="tel" placeholder="Search the Community!" h="34px" onKeyDown={handleKeyDown} />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
