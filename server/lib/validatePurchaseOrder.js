// Validation function for a single purchase order row
function validatePurchaseOrder(rowNumber, row) {
  const errors = [];

  // Initial check if Quantity is a positive integer
  const quantity = parseInt(row.Quantity, 10);
  if (isNaN(quantity) || quantity <= 0) {
    errors.push(
      `In row ${rowNumber}: Quantity should be a positive integer. Given: '${row.Quantity}'`
    );
  }
  // Double check if quantity is whole number
  else if (/^\d+$/.test(row.Quantity) === false) {
    errors.push(
      `In row ${rowNumber}: Quantity should not be a float. Given: '${row.Quantity}'`
    );
  }

  // Check if model number is not empty
  const modelNumber = row["Model Number"];
  if (!modelNumber) {
    errors.push(`In row ${rowNumber}: Model Number cannot be empty`);
  }

  // Check if model number without dashes/spaces/symbols is not empty (at least one letter or number)
  const modelNumberWithoutDashes = modelNumber.replace(/[-\s]/g, "");
  if (!modelNumberWithoutDashes.match(/[a-zA-Z0-9]/)) {
    errors.push(
      `In row ${rowNumber}: Model Number is just dashes, spaces, or symbols. Given: '${modelNumber}'`
    );
  }

  // Check if Unit Price is a positive number that is float or integer and not zero
  const unitPrice = parseFloat(row["Unit Price"]);
  if (isNaN(unitPrice) || unitPrice <= 0) {
    errors.push(
      `In row ${rowNumber}: Unit Price should be a positive number. Given: '${row["Unit Price"]}'`
    );
  }

  return errors;
}

module.exports = validatePurchaseOrder;
