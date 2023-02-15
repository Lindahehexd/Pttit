import { Flex, Icon, Text } from "@chakra-ui/react";
import { TabItem } from "./NewPostForm";

type Props = {
  item: TabItem;
  selected: boolean;
  setSelectedTab: (v:string) => void;
};

const TabItems = ({ item, selected, setSelectedTab }: Props) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      py="14px"
      cursor="pointer"
      _hover={{ bg: "gray.700" }}
      fontWeight='bold'
      color={selected ? "blue.300" : "gray.500"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selected ? "blue.500" : "gray.500"}
      borderRightColor={selected ? "blue.500" : "gray.500"}
      onClick={() => setSelectedTab(item.title)}
    >
      <Flex>
        <Icon as={item.icon} />
      </Flex>
      <Text> {item.title} </Text>
    </Flex>
  );
};

export default TabItems;
