import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import MessageForm from "@/app/(user)/(home)/message/_components/MessageForm";

const mockGoToRegister = jest.fn();

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("MessageForm", () => {
  it("renders form", () => {
    render(<MessageForm userId={"a"} receiverId={"b"} />);

    const elem = screen.getByRole("textbox");
    //const form = screen.getByRole("form");
    //const placehold = screen.getByPlaceholderText("Send message");

    expect(elem).toBeInTheDocument();
  });
});
