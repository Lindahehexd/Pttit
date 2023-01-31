/* eslint-disable react/no-children-prop */
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import React from "react";

type Props = {};

const SearchInput: React.FC<Props> = () => {


  return (
    <Flex flexGrow={1} mx={2} align="center">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" mb={1} />}
        />
        <Input type="tel" placeholder="Search" h='34px' />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
