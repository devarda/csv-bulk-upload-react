//a table for the purchase orders that gets its data from the zustand store

import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import PurchaseOrdersStore from "../PurchaseOrdersStore";
import { Typography } from "@mui/material";

function PurchaseOrdersTable() {
  const purchaseOrders = PurchaseOrdersStore((state) => state.purchaseOrders);

  // Transform data to fit DataGrid requirements
  const rows = purchaseOrders.map((order, index) => ({
    id: index, // Assign unique id based on array index or you can use any unique value from your data
    ...order,
  }));

  const columns = [
    { field: "model_number", headerName: "Model Number", width: 200 },
    {
      field: "unit_price",
      headerName: "Unit Price",
      type: "number",
      width: 150,
    },
    { field: "quantity", headerName: "Quantity", type: "number", width: 150 },
    {
      field: "created_date",
      headerName: "Created Date",
      type: "dateTime",
      width: 230,
      sortComparator: (v1, v2) =>
        new Date(v2).getTime() - new Date(v1).getTime(), // Custom comparator for date sorting
      valueGetter: (params) => new Date(params.value),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Typography variant="h4" component="div" gutterBottom>
        Purchase Orders
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sortingOrder={["desc"]}
        sortModel={[
          {
            field: "created_date",
            sort: "desc",
          },
        ]}
      />
    </div>
  );
}

export default PurchaseOrdersTable;
