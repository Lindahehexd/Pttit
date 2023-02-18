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
    <Flex flexGrow={1} mx={7} align="center">
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" mb={1} />} />
        <Input type="tel" placeholder="前往看板" h="34px" onKeyDown={handleKeyDown} _placeholder={{color: 'gray.400'}} />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
