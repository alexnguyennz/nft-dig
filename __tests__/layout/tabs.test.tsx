import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "../matchMedia.mock";

import Tabs from "@/components/layout/tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();
const Providers = ({ children }: { children: JSX.Element }) => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>{children}</ChakraProvider>
  </QueryClientProvider>
);

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "",
    };
  },
}));

describe("Tabs", () => {
  it("renders tabs", () => {
    render(
      <Providers>
        <Tabs />
      </Providers>
    );
  });

  it("renders Wallet tab", async () => {
    const user = userEvent.setup();

    render(
      <Providers>
        <Tabs />
      </Providers>
    );

    await user.click(screen.getAllByRole("tab")[0]);

    expect(screen.getByRole("heading", { name: /view NFTs for any wallet/i }));
  });

  it("renders NFT tab", async () => {
    const user = userEvent.setup();

    render(
      <Providers>
        <Tabs />
      </Providers>
    );

    await user.click(screen.getAllByRole("tab")[1]);

    expect(screen.getByRole("heading", { name: /view any NFT/i }));
  });

  it("renders Collection tab", async () => {
    const user = userEvent.setup();

    render(
      <Providers>
        <Tabs />
      </Providers>
    );

    await user.click(screen.getAllByRole("tab")[2]);

    expect(
      screen.getByRole("heading", { name: /view NFTs for any collection/i })
    );
  });

  it("renders Collection tab", async () => {
    const user = userEvent.setup();

    render(
      <Providers>
        <Tabs />
      </Providers>
    );

    await user.click(screen.getAllByRole("tab")[3]);

    expect(screen.getByRole("heading", { name: /search for any NFTs/i }));
  });
});
