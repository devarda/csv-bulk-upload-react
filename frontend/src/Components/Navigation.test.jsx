import React from "react";
import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";

describe("<Navigation />", () => {
  test("renders the AppBar with correct title", () => {
    render(<Navigation />);

    const title = screen.getByText(/Purchase Orders/i);
    expect(title).toBeInTheDocument();
  });
});
