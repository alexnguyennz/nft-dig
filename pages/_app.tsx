import "@/src/styles/main.css";

import { Lexend } from "next/font/google";
import type { AppProps } from "next/app";

import ReactQueryProvider from "@/src/providers/react-query";
import ChakraProvider from "@/src/providers/chakra";
import ConnectKitProvider from "@/src/providers/connectkit";

import Layout from "@/components/layout/layout";

const font = Lexend({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <ConnectKitProvider>
        <ChakraProvider cookies={pageProps.cookies}>
          <Layout>
            <div className={font.className}>
              <Component {...pageProps} />
            </div>
          </Layout>
        </ChakraProvider>
      </ConnectKitProvider>
    </ReactQueryProvider>
  );
}
