/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-debugging-utils */
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("APP", () => {
  xit("userEvent test", async () => {
    render(<App />);
    await screen.findByText(/Logged in as/i);
    expect(screen.queryByText(/Searches for React/)).toBeNull();
    userEvent.type(screen.getByRole("textbox"), "React");
    expect(screen.getByText(/Searches for React/)).toBeInTheDocument();
  });
  xit("fireEvent test", async () => {
    render(<App />);
    await screen.findByText(/Logged in as/i);
    expect(screen.queryByText(/Searches for React/)).toBeNull();
    screen.debug();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "React" },
    });
    expect(screen.getByText(/Searches for React/)).toBeInTheDocument();
    screen.debug();
  });
  xit("renders App component", () => {
    render(<App />);
    screen.debug();
    expect(screen.getByText(/Search:/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("search text...")).toBeInTheDocument();
    expect(screen.getByAltText("search pic")).toBeInTheDocument();
    expect(screen.getByDisplayValue("")).toBeInTheDocument();
    expect(screen.queryByText(/Searches for React:/i)).toBeNull();
  });
  xit("async test", async () => {
    render(<App />);
    expect(screen.queryByText(/logged in as/i)).toBeNull();
    expect(await screen.findByText(/logged in as/i)).toBeInTheDocument();
    // Assertive Functions Examples:
    expect(screen.getByAltText(/search pic/)).toHaveClass("image");
    expect(screen.getByLabelText(/search/i)).not.toBeRequired();
    expect(screen.getByLabelText(/search/i)).toBeEmpty();
    expect(screen.getByLabelText(/search/i)).toHaveAttribute("id");
  });
});


