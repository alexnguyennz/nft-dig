import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Index from "@/pages/index";

describe("Index", () => {
  it("renders Index (nothing)", () => {
    render(<Index />);
  });
});
