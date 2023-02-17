import Navbar from "../Navbar/Navbar";

import { Spinner, Center } from "@chakra-ui/react";

interface LayoutProps {
  children: React.ReactElement;
  isLoading: boolean;
}

const Layout = ({ children, isLoading }: LayoutProps) => {
  return (
    <>
      <Navbar />
        {isLoading && (
          <Center h='100vh' w='100%' bg='black'>
            <Spinner />
          </Center>
        )}
        {children}
    </>
  );
};

export default Layout;
