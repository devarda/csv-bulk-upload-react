import "./App.scss";
import Navigation from "./Components/Navigation";
import CsvUploader from "./Components/CsvUploader";
import PurchaseOrdersTable from "./Components/PurchaseOrdersTable";

function App() {
  return (
    <div className="App">
      <header className="App__Header">
        <Navigation />
      </header>

      <div className="App__Wrapper">
        <CsvUploader />
        <PurchaseOrdersTable />
      </div>
    </div>
  );
}

export default App;
