var express = require("express");
var router = express.Router();

/* POST purchase orders CSV file */
router.post("/purchase-orders/bulk-insert", function (req, res, next) {
  res.send("respond with a resource");
});

/* GET list purchase orders */
router.get("/purchase-orders/list", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
