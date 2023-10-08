import "./App.scss";
import Navigation from "./Components/Navigation";
import CsvUploader from "./Components/CsvUploader";
import PurchaseOrdersTable from "./Components/PurchaseOrdersTable";
import { useEffect, useState } from "react";
import PurchaseOrdersStore from "./PurchaseOrdersStore";
import { Alert, Snackbar } from "@mui/material";

function App() {
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  //on page load, fetch all purchase orders from the database
  //and store them in the zustand store
  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await fetch("/api/v1/purchase-orders/list");
        const data = await response.json();
        if (data.success && data.purchaseOrders?.length) {
          PurchaseOrdersStore.setPurchaseOrders(data.purchaseOrders);
        }
      } catch (err) {
        setMessage("Error fetching purchase orders");
        setSnackbarOpen(true);
      }
    };
    fetchPurchaseOrders();
  }, []);

  return (
    <div className="App">
      <header className="App__Header">
        <Navigation />
      </header>

      <div className="App__Wrapper">
        <CsvUploader />
        <PurchaseOrdersTable />
      </div>

      {/* Snackbar messages */}
      {message && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={10000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default App;
