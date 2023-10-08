import React from "react";
import { render, screen } from "@testing-library/react";
import PurchaseOrdersTable from "./PurchaseOrdersTable";
import PurchaseOrdersStore from "../PurchaseOrdersStore";

// Mocking the Zustand store for PurchaseOrders
jest.mock("../PurchaseOrdersStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("<PurchaseOrdersTable />", () => {
  beforeEach(() => {
    // Set up a mock state for the store
    PurchaseOrdersStore.mockImplementation((selector) =>
      selector({
        purchaseOrders: [
          {
            model_number: "Model123",
            unit_price: 150,
            quantity: 10,
            created_date: new Date().toISOString(),
          },
        ],
      })
    );
  });

  test("renders the table with correct title", () => {
    render(<PurchaseOrdersTable />);

    const title = screen.getByText(/Purchase Orders/i);
    expect(title).toBeInTheDocument();
  });

  test("displays data from the zustand store correctly", () => {
    render(<PurchaseOrdersTable />);

    // Since we've mocked a single order in the store, we check if it's displayed
    const modelNumberCell = screen.getByText("Model123");
    const unitPriceCell = screen.getByText("150");
    const quantityCell = screen.getByText("10");

    expect(modelNumberCell).toBeInTheDocument();
    expect(unitPriceCell).toBeInTheDocument();
    expect(quantityCell).toBeInTheDocument();
  });
});
