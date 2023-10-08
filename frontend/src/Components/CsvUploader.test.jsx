import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import CsvUploader from "./CsvUploader";
import axios from "axios";

jest.mock("axios");

afterEach(() => {
  axios.mockReset();
});

describe("<CsvUploader />", () => {
  test("should display an error when a non-CSV file is uploaded", async () => {
    render(<CsvUploader />);
    const input = screen.getByLabelText(/upload purchase order/i);

    await act(async () => {
      fireEvent.change(input, {
        target: {
          files: [new File(["content"], "file.txt", { type: "text/plain" })],
        },
      });
    });

    const error = await screen.findByText("Please select a valid CSV file.");
    expect(error).toBeInTheDocument();
  });

  test("should display an error message when API request fails", async () => {
    render(<CsvUploader />);
    const input = screen.getByLabelText(/upload purchase order/i);

    await act(async () => {
      fireEvent.change(input, {
        target: {
          files: [new File(["content"], "file.csv", { type: "text/csv" })],
        },
      });

      axios.mockRejectedValue(new Error("An error occurred"));
    });

    const errorMsg = await screen.findByText(
      "An error occurred while uploading."
    );
    expect(errorMsg).toBeInTheDocument();
  });
});
