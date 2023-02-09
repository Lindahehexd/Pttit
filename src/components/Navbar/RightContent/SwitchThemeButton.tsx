import { Switch, useColorMode } from "@chakra-ui/react";

const SwitchThemeButton = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <Switch id="dark_mode" colorScheme="blue" size="lg" onChange={toggleColorMode} />
    </>
  );
};

export default SwitchThemeButton;
