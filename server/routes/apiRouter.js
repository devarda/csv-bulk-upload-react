const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const validatePurchaseOrder = require("../lib/validatePurchaseOrder");
const router = express.Router();

// Define the storage for uploaded files using multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define your route for bulk insertion of purchase orders
router.post(
  "/purchase-orders/bulk-insert",
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "No file uploaded." });
    }

    const purchaseOrders = [];
    const errors = [];

    // Parse the uploaded CSV file
    const csvData = req.file.buffer.toString();
    let rowNumber = 0;
    const { Readable } = require("stream");
    const readableStream = Readable.from(csvData);

    const validHeaders = ["Model Number", "Unit Price", "Quantity"];
    //validate headers from csvData
    const headerValidationErrors = [];
    const csvHeaders = csvData.split("\n")[0].split(",");
    csvHeaders.forEach((header) => {
      if (!validHeaders.includes(header)) {
        headerValidationErrors.push(
          `Invalid header: '${header}'. Valid headers are: ${validHeaders.join(
            ", "
          )}`
        );
      }
    });
    if (headerValidationErrors.length > 0) {
      return res
        .status(400)
        .json({ success: false, errors: headerValidationErrors });
    }

    // Read each row from the CSV file
    readableStream
      .pipe(csv())
      .on("data", (row) => {
        rowNumber++;
        // Validate each row's data
        const validationErrors = validatePurchaseOrder(rowNumber, row); // Implement your validation function
        if (validationErrors.length === 0) {
          purchaseOrders.push(row);
        } else {
          errors.push(...validationErrors);
        }
      })
      .on("end", async () => {
        if (errors.length === 0) {
          // All data is valid, insert into the database
          try {
            const connection = await require("../mysqlConnection")();
            const database_name = process.env.MYSQL_DATABASE;

            await connection.changeUser({ database: database_name });

            // Insert all rows into the database at once
            // Each row has Model Number, Unit Price, Quantity
            const insertQuery = `INSERT INTO purchase_orders (model_number, unit_price, quantity) VALUES ?`;
            await connection.query(insertQuery, [
              purchaseOrders.map((row) => [
                row["Model Number"],
                row["Unit Price"],
                row.Quantity,
              ]),
            ]);

            res.json({ success: true, purchaseOrders });
          } catch (err) {
            res.status(400).json({ success: false, error: err });
          }
        } else {
          res.status(400).json({ success: false, errors });
        }
      });
  }
);

/* GET list purchase orders */
router.get("/purchase-orders/list", async function (req, res, next) {
  try {
    const connection = await require("../mysqlConnection")();
    const database_name = process.env.MYSQL_DATABASE;

    await connection.changeUser({ database: database_name });

    //no limit on number of rows returned for demo purposes
    const selectQuery = `SELECT * FROM purchase_orders ORDER BY created_date DESC`;

    const [rows] = await connection.query(selectQuery);

    res.json({ success: true, purchaseOrders: rows });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
});

module.exports = router;
