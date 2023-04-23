import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import selectEvent from "react-select-event";

import "@/__tests__/matchMedia.mock";

import ChainSelect from "@/components/chain-select/chain-select";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();
const Providers = ({ children }: { children: JSX.Element }) => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>{children}</ChakraProvider>
  </QueryClientProvider>
);

describe("ChainSelect", () => {
  it("renders chain select", () => {
    render(
      <Providers>
        <ChainSelect />
      </Providers>
    );

    const select = screen.getByRole("combobox", {
      name: /chain options select/i,
    });

    expect(select).toBeInTheDocument();
  });

  it("renders chain select options", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <Providers>
        <ChainSelect />
      </Providers>
    );

    await user.click(
      screen.getByRole("combobox", {
        name: /chain options select/i,
      })
    );

    const listbox = container.querySelector(
      "#react-select-chain-select-listbox"
    );

    expect(listbox).toBeInTheDocument();
  });

  it("renders different chain", async () => {
    render(
      <Providers>
        <ChainSelect />
      </Providers>
    );

    await selectEvent.select(screen.getByLabelText("Chain options select"), [
      "Polygon",
    ]);

    expect(screen.getByTestId("chain-select")).toHaveFormValues({
      "chain-select": "polygon",
    });
  });
});
