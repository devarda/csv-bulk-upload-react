//an upload component that allows the user to upload a csv file (only csv files are accepted)
//when uploaded it should POST to /api/v1/purchase-orders/bulk-insert
//if api returns {success:false, errors: [array of errors]} then display the errors to the user
//if api returns {success:true, items: [array of items]} then display a success message to the user and add the new items via zustand
import React, { useRef } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import PurchaseOrdersStore from "../PurchaseOrdersStore";
import { Typography } from "@mui/material";

function CsvUploader() {
  const inputRef = useRef(null);
  const [message, setMessage] = React.useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const { addPurchaseOrder } = PurchaseOrdersStore();
  const [errors, setErrors] = React.useState([]);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          //host from .env
          process.env.REACT_APP_API_HOST +
            "/api/v1/purchase-orders/bulk-insert",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          setMessage("Successfully uploaded items!", { severity: "success" });
          response.data.items.forEach((item) => addPurchaseOrder(item));
          setErrors([]);
        } else {
          setErrors(response.data.errors);
        }
      } catch (error) {
        setErrors(["An error occurred while uploading."]);
      }

      setSnackbarOpen(true);
    } else {
      setErrors(["Please select a valid CSV file."]);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="App__CsvUploaderContainer">
      <Typography variant="h4" component="div" gutterBottom>
        Upload Purchase Order
      </Typography>
      <input
        type="file"
        ref={inputRef}
        hidden
        accept=".csv"
        onChange={handleUpload}
      />
      <Button
        variant="contained"
        component="span"
        onClick={() => inputRef.current.click()}
      >
        Upload CSV
      </Button>
      <br />
      {/* errors list in red*/}
      <div className="App__CsvUploaderErrors">
        {errors.map((error) => (
          <Typography variant="body1" component="li" gutterBottom color="red">
            {error}
          </Typography>
        ))}
      </div>
      {/* Snackbar messages */}
      {message && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={10000}
          onClose={handleCloseSnackbar}
          message={message}
        />
      )}
    </div>
  );
}

export default CsvUploader;
