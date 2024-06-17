import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

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
});
