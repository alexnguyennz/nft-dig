import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ConnectKitButton } from "connectkit";
import ConnectButton from "@/components/layout/header/connectkit/connect-button";

describe("ConnectKit", () => {
  it("renders Connect Wallet button", () => {
    render(<ConnectButton />);
  });
});
