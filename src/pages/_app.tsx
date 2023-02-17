RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../chakara/theme";
import { RecoilRoot } from "recoil";
import { Router } from "next/router";
import { RecoilEnv } from "recoil";
import { useState } from "react";
import Layout from "@/components/Layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  Router.events.on("routeChangeStart", () => setIsLoading(true));
  Router.events.on("routeChangeComplete", () => setIsLoading(false));
  Router.events.on("routeChangeError", () => setIsLoading(false));

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout isLoading={isLoading}>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}
