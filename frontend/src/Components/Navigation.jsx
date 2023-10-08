// Material UI Navigation Bar with CSV Template Download dropdown menu that downloads
// correctly formatted CSV templates for the user to fill out and upload to the database
// incorrectly formatted CSV files will not be accepted by the database as an example

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Navigation() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  function handleDownload(templateType) {
    let data = "";
    switch (templateType) {
      case "Blank":
        data = `Model Number,Unit Price,Quantity
             `;
        break;
      case "Correct":
        data = `Model Number,Unit Price,Quantity
               Blueridge BMY917,15.99,5
               Blueridge BMY1817,20.49,3
               Blueridge BMY2417,25.00,10`;
        break;
      case "Incorrect Model Number":
        data = `Model Number,Unit Price,Quantity
           ---,15.99,5
           -,20.49,3
           ,25.00,10`;
        break;
      case "Incorrect Unit Price":
        data = `Model Number,Unit Price,Quantity
           Blueridge BMY917,fifteen,5
           Blueridge BMY1817,,3
           Blueridge BMY1847,-14,3
           Blueridge BMY1840,0,3
           Blueridge BMY2417,twenty-five,10`;
        break;
      case "Incorrect Quantity":
        data = `Model Number,Unit Price,Quantity
           Blueridge BMY917,15.99,5.5
           Blueridge BMY1817,20.49,three
           Blueridge BMY1817,20.49,-1
           Blueridge BMY2417,25.00,`;
        break;
      case "Wrong Headers":
        data = `Model,UntPrc,Qty
           Blueridge BMY917,15.99,5
           Blueridge BMY1817,20.49,3
           Blueridge BMY2417,25.00,10
           Blueridge BMY2417,25.00,10`;
        break;
      default:
        console.error("Unknown template type:", templateType);
        return;
    }

    // Create a blob from the data and download it
    const blob = new Blob([data], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${templateType} Template.csv`;
    document.body.appendChild(a); // Required for Firefox
    a.click();
    a.remove(); // Remove the link after downloading
    handleMenuClose();
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Purchase Orders
        </Typography>

        {/* CSV Template Download Dropdown */}
        <Button
          color="inherit"
          endIcon={<ArrowDropDownIcon />}
          onClick={handleMenuClick}
        >
          Download CSV Template
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleDownload("Blank")}>
            Blank Template
          </MenuItem>
          <MenuItem onClick={() => handleDownload("Correct")}>
            Example Correct Template
          </MenuItem>
          <MenuItem onClick={() => handleDownload("Incorrect Model Number")}>
            Example Incorrect Model Number
          </MenuItem>
          <MenuItem onClick={() => handleDownload("Incorrect Unit Price")}>
            Example Incorrect Unit Price
          </MenuItem>
          <MenuItem onClick={() => handleDownload("Incorrect Quantity")}>
            Example Incorrect Quantity
          </MenuItem>
          <MenuItem onClick={() => handleDownload("Wrong Headers")}>
            Example Wrong Headers
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
