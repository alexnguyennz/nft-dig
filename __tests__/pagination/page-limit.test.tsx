import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "../matchMedia.mock";

import PageLimit from "@/components/pagination/page-limit";
import { ChakraProvider } from "@chakra-ui/react";

const Providers = ({ children }: { children: JSX.Element }) => (
  <ChakraProvider>{children}</ChakraProvider>
);

describe("PageLimit", () => {
  it("renders page limit", () => {
    render(
      <Providers>
        <PageLimit />
      </Providers>
    );

    const select = screen.getByRole("combobox", {
      name: /page limit/i,
    });

    expect(select).toBeInTheDocument();
  });

  it("renders page limit options", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <Providers>
        <PageLimit />
      </Providers>
    );

    await user.click(
      screen.getByRole("combobox", {
        name: /page limit/i,
      })
    );

    const listbox = container.querySelector(
      "#react-select-limit-select-listbox"
    );

    expect(listbox).toBeInTheDocument();
  });
});
