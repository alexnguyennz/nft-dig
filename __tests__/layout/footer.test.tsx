import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/footer";

describe("Footer", () => {
  it("renders Twitter link", () => {
    render(<Footer />);

    const twitterLink = screen.getByLabelText("Twitter page");

    expect(twitterLink).toBeInTheDocument();
  });
});
