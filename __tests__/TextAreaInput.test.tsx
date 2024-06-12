import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import TextAreaInput from "@/app/_components/inputs/TextAreaInput";

describe("TextAreaInput", () => {
  it("renders input field", () => {
    render(<TextAreaInput />);

    const elem = screen.getByRole("textBox");

    expect(elem).toBeInTheDocument();
  });
});
