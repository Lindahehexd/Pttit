import useDirectory from "@/hooks/useDirectory";
import { Flex, MenuItem, Image, Icon } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons/lib";

type MenuListItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL: string;
};

const MenuListItem = ({ displayText, link, icon, iconColor, imageURL }: MenuListItemProps) => {
  const { onSelectMenuItem } = useDirectory();
  return (
    <MenuItem
      w="100%"
      fontSize="10px"
      _hover={{ bg: "gray.500" }}
      onClick={() => onSelectMenuItem({ displayText, link, icon, iconColor, imageURL })}
    >
      <Flex align="center">
        {imageURL ? (
          <Image src={imageURL} borderRadius="full" boxSize="28px" mr={2} alt="" />
        ) : (
          <Icon as={icon} fontSize={28} mr={2} color={iconColor} />
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};

export default MenuListItem;
