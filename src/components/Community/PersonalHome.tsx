import React, { useEffect, useState } from "react";
import { Button, Center, Flex, Icon, Stack, Text } from "@chakra-ui/react";
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
      <Flex bgImage="url(/images/pttlogin1.png)" backgroundSize="cover" borderRadius="4px 4px 0px 0px" h='100px'></Flex>
      <Flex direction="column" p="12px" bg="gray.900">
          <Center>
            <Text fontSize="sm">
              當前IP : {ip} ({countryName})
            </Text>
          </Center>
      </Flex>
    </Flex>
  );
};
export default PersonalHome;
