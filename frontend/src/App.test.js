import React from "react";
import { render, screen, act } from "@testing-library/react";
import App from "./App"; // Adjust the path accordingly
import PurchaseOrdersStore from "./PurchaseOrdersStore";

// Mock components to make testing the App component itself simpler
jest.mock("./Components/Navigation", () => () => <div>Navigation Mock</div>);
jest.mock("./Components/CsvUploader", () => () => <div>CsvUploader Mock</div>);
jest.mock("./Components/PurchaseOrdersTable", () => () => (
  <div>PurchaseOrdersTable Mock</div>
));

describe("<App />", () => {
  // Mock fetch function for testing the useEffect fetching
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ success: true, purchaseOrders: [] }),
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders header and wrapper contents correctly", () => {
    render(<App />);

    expect(screen.getByText("Navigation Mock")).toBeInTheDocument();
    expect(screen.getByText("CsvUploader Mock")).toBeInTheDocument();
    expect(screen.getByText("PurchaseOrdersTable Mock")).toBeInTheDocument();
  });

  test("displays error Snackbar if fetch fails", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Fetch Error"))
    );

    act(() => {
      render(<App />);
    });

    const errorMessage = await screen.findByText(
      /Error fetching purchase orders:/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  // Additional tests can be written to check the snackbar close functionality,
  // or if the snackbar displays custom messages based on different error types.
});
