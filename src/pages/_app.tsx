import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakara/theme";
import { RecoilRoot } from "recoil";
import Layout from "@/components/Layout/Layout";
import { Router } from "next/router";
import { RecoilEnv } from "recoil";
import { useEffect, useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  Router.events.on("routeChangeStart", () => setIsLoading(true));
  Router.events.on("routeChangeComplete", () => setIsLoading(false));
  Router.events.on("routeChangeError", () => setIsLoading(false));

  useEffect(() => {
    // add an event listener to display the spinner when the page is refreshed

    window.addEventListener("beforeunload", () => {
      setIsLoading(true);
    });
    window.removeEventListener("beforeunload", () => {
      setIsLoading(false);
    });
  }, []);

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          {isLoading ? (
            <Center h="100vh" w="100%">
              <Spinner />
            </Center>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}
