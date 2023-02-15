import React, { useEffect, useState } from "react";
import { Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { RiGhostSmileFill } from "react-icons/ri";

const PersonalHome: React.FC = () => {
  const [ip, setIp] = useState("");
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    fetch("https://api.ipify.org/?format=json")
      .then((response) => response.json())
      .then((data) => setIp(data.ip))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (ip) {
      fetch(`https://ipapi.co/${ip}/country/`)
        .then((response) => response.text())
        .then((data) => {
          setCountryName(data);
        })
        .catch((error) => console.error(error));
    }
  }, [ip]);

  return (
    <Flex direction="column" borderRadius={4} border="1px solid" borderColor="gray.600" position="sticky">
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="34px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/8bitbg2.png)"
        backgroundSize="cover"
      ></Flex>
      <Flex direction="column" p="12px" bg="gray.900">
        <Flex align="center" mb={2}>
          <Icon as={RiGhostSmileFill} fontSize={30} color="yellow.300" mr={2} />
          <Text fontWeight={600}>早安</Text>
        </Flex>
        <Stack spacing={3}>
          <Text>
            當前IP : {ip} ({countryName})
          </Text>
        </Stack>
      </Flex>
    </Flex>
  );
};
export default PersonalHome;
