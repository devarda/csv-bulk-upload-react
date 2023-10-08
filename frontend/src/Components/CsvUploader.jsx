//an upload component that allows the user to upload a csv file (only csv files are accepted)
//when uploaded it should POST to /api/v1/purchase-orders/bulk-insert
//if api returns {success:false, errors: [array of errors]} then display the errors to the user
//if api returns {success:true, items: [array of items]} then display a success message to the user and add the new items via zustand
import React, { useRef } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import PurchaseOrdersStore from "../PurchaseOrdersStore";
import { Alert, Typography } from "@mui/material";

//axios do not error out on non 200 status codes
axios.defaults.validateStatus = () => true;

function CsvUploader() {
  const inputRef = useRef(null);
  const [message, setMessage] = React.useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const { addPurchaseOrder } = PurchaseOrdersStore();
  const [errors, setErrors] = React.useState([]);

  const handleUpload = async (event) => {
    setMessage("");
    setSnackbarOpen(false);

    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          //host from .env
          "/api/v1/purchase-orders/bulk-insert",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          setMessage("Successfully uploaded items!");
          setSnackbarOpen(true);
          response.data.purchaseOrders.forEach((item) =>
            addPurchaseOrder(item)
          );
          setErrors([]);
        } else {
          setErrors(response.data.errors);
        }
      } catch (error) {
        setErrors(["An error occurred while uploading."]);
        console.error(error);
      }
    } else {
      setErrors(["Please select a valid CSV file."]);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="App__CsvUploaderContainer">
      <Typography variant="h4" component="div" gutterBottom id="uploadLabel">
        Upload Purchase Order
      </Typography>
      <input
        type="file"
        ref={inputRef}
        hidden
        accept=".csv"
        onChange={handleUpload}
        aria-labelledby="uploadLabel"
      />
      <Button
        variant="contained"
        component="span"
        onClick={() => inputRef.current.click()}
      >
        Upload CSV
      </Button>

      {errors.length > 0 && (
        <Button
          style={{ marginLeft: "10px" }}
          variant="outlined"
          component="span"
          onClick={() => setErrors([])}
        >
          Clear Errors
        </Button>
      )}
      <br />
      {/* errors list in red*/}
      <div className="App__CsvUploaderErrors">
        {errors.map((error, index) => (
          <Typography
            key={index}
            variant="body1"
            component="li"
            gutterBottom
            color="red"
          >
            {error}
          </Typography>
        ))}
      </div>
      {/* Snackbar success message */}
      {message && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={10000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default CsvUploader;
