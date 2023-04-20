import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import InfoModal from "@/components/layout/header/info-modal";

describe("InfoModal", () => {
  it("renders info button", () => {
    render(<InfoModal />);

    const button = screen.getByRole("button", { name: /Open info modal/i });

    expect(button).toBeInTheDocument();
  });

  it("renders info modal", async () => {
    const user = userEvent.setup();

    render(<InfoModal />);

    await user.click(screen.getByRole("button", { name: /Open info modal/i }));

    const heading = screen.getByText("What is NFT Dig?");

    expect(heading).toBeInTheDocument();
  });
});
