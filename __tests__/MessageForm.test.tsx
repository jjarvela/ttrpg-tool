import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import MessageForm from "@/app/(user)/(home)/message/_components/MessageForm";

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("MessageForm", () => {
  it("should render the input", () => {
    render(<MessageForm userId={"a"} receiverId={"b"} />);

    const placeholder = screen.getByPlaceholderText("Send message");

    expect(placeholder).toBeInTheDocument();
  });

  it("should be able to add text to the input", async () => {
    render(<MessageForm userId={"a"} receiverId={"b"} />);

    const input = screen.getByPlaceholderText("Send message");
    await user.type(input, "Hello");

    expect(input).toHaveValue("Hello");
  });

  it("should empty the text input after submit", async () => {
    render(<MessageForm userId={"a"} receiverId={"b"} />);

    const input = screen.getByPlaceholderText("Send message");
    await user.type(input, "Hello");
    await user.keyboard("{Enter}");

    expect(input).toHaveValue("");
  });
});
