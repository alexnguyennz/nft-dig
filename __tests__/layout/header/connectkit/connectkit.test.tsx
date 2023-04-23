import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import "@/__tests__/matchMedia.mock";

import ConnectKit from "@/components/layout/header/connectkit/connectkit";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import ConnectKitProvider from "@/src/providers/connectkit";

const queryClient = new QueryClient();
const Providers = ({ children }: { children: JSX.Element }) => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </ChakraProvider>
  </QueryClientProvider>
);

describe("ConnectKit", () => {
  it("renders chain select", () => {
    render(
      <Providers>
        <ConnectKit />
      </Providers>
    );
  });
});
