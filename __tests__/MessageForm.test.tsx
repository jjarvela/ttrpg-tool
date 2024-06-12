import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import MessageForm from "@/app/(user)/(home)/message/_components/MessageForm";

const mockGoToRegister = jest.fn();

describe("MessageForm", () => {
  it("renders form", () => {
    render(<MessageForm userId={"a"} receiverId={"b"} />);

    const elem = screen.getByRole("textBox", { name: "message" });
    const form = screen.getByRole("form");
    //const placehold = screen.getByPlaceholderText("Send message");

    expect(elem).toBeInTheDocument();
  });
});
