import {
  ChakraProvider,
  extendTheme,
  cookieStorageManagerSSR,
} from "@chakra-ui/react";
import { Lexend } from "next/font/google";

const font = Lexend({
  subsets: ["latin"],
});

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  fonts: {
    heading: `${font.style.fontFamily}, sans-serif`,
    body: `${font.style.fontFamily}, sans-serif`,
  },
});

export default function CustomChakraProvider({
  cookies,
  children,
}: {
  cookies: string;
  children: JSX.Element;
}) {
  const colorModeManager = cookieStorageManagerSSR(cookies);
  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
      {children}
    </ChakraProvider>
  );
}
