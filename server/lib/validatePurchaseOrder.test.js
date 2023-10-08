const validatePurchaseOrder = require("./validatePurchaseOrder");

describe("validatePurchaseOrder", () => {
  test("should return error for non-positive integer quantity", () => {
    const errors = validatePurchaseOrder(1, {
      Quantity: "-5",
      "Model Number": "Model123",
      "Unit Price": "15.99",
    });
    expect(errors).toContain(
      "In row 1: Quantity should be a positive integer. Given: '-5'"
    );
  });

  test("should return error for float quantity", () => {
    const errors = validatePurchaseOrder(1, {
      Quantity: "5.5",
      "Model Number": "Model123",
      "Unit Price": "15.99",
    });
    expect(errors).toContain(
      "In row 1: Quantity should not be a float. Given: '5.5'"
    );
  });

  test("should return error for empty model number", () => {
    const errors = validatePurchaseOrder(1, {
      Quantity: "5",
      "Model Number": "",
      "Unit Price": "15.99",
    });
    expect(errors).toContain("In row 1: Model Number cannot be empty");
  });

  test("should return error for model number made of dashes, spaces, or symbols only", () => {
    const errors = validatePurchaseOrder(1, {
      Quantity: "5",
      "Model Number": "---",
      "Unit Price": "15.99",
    });
    expect(errors).toContain(
      "In row 1: Model Number is just dashes, spaces, or symbols. Given: '---'"
    );
  });

  test("should return error for non-positive unit price", () => {
    const errors = validatePurchaseOrder(1, {
      Quantity: "5",
      "Model Number": "Model123",
      "Unit Price": "-15.99",
    });
    expect(errors).toContain(
      "In row 1: Unit Price should be a positive number. Given: '-15.99'"
    );
  });

  test("should return no errors for valid input", () => {
    const errors = validatePurchaseOrder(1, {
      Quantity: "5",
      "Model Number": "Model123",
      "Unit Price": "15.99",
    });
    expect(errors.length).toBe(0);
  });
});
