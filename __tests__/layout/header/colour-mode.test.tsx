import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ColourMode from "@/components/layout/header/colour-mode";

describe("ColourMode", () => {
  it("renders colour mode button", () => {
    render(<ColourMode />);

    const button = screen.getByRole("button", { name: /Toggle colour mode/i });

    expect(button).toBeInTheDocument();
  });

  it("changes colour mode", async () => {
    const user = userEvent.setup();

    const { container } = render(<ColourMode />);

    await user.click(
      screen.getByRole("button", { name: /Toggle colour mode/i })
    );

    const svgEl = container.querySelector("svg");

    expect(svgEl!.classList.toString()).toContain("tabler-icon-sun-filled");
  });
});
