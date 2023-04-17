import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "@/src/providers/chakra";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <Script
          type="module"
          strategy={"beforeInteractive"}
          src="/js/model-viewer.min.js"
        />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {/* hide temporary flash on input styles */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
