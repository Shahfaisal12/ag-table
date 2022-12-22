import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import MyLoadingOverlay from "./myLoadingOverlay";
import MyNoRowsOverlay from "./myNoRowsOverlay";

const Table = () => {
  const [rowData, setRowData] = useState();

  // const data = [
  //     { make: "Porsche", model: "Boxter", price: 72000 },
  //   { make: "Ford", model: "Mondeo", price: 32000 },
  //   { make: "Ford", model: "Mondeo", price: 32000 },
  //   { make: "Toyota", model: "Celica", price: 35000 },
  //   { make: "Toyota", model: "Celica", price: 35000 },
  //   { make: "Porsche", model: "Boxter", price: 72000 },
  //   { make: "Toyota", model: "Celica", price: 35000 },
  //   { make: "Toyota", model: "Celica", price: 35000 },
  //   { make: "Porsche", model: "Boxter", price: 72000 },
  //   { make: "Porsche", model: "Boxter", price: 72000 },
  //   { make: "Porsche", model: "Boxter", price: 72000 },
  //   { make: "Toyota", model: "Celica", price: 35000 },
  //   { make: "Porsche", model: "Boxter", price: 72000 },
  //   { make: "Ford", model: "Mondeo", price: 32000 },
  //   { make: "Ford", model: "Mondeo", price: 32000 },
  //   { make: "Porsche", model: "Boxter", price: 72000 },
  //   { make: "Porsche", model: "Boxter", price: 72000 },
  //   { make: "Porsche", model: "Boxter", price: 72000 }
  // ];

  const actionButton = (params) => {
    console.log(params);
    alert(`${params.data.model} ${params.data.price}`);
  };

  ///////////  Header ///////////

  const coloumns = [
    {
      headerName: "Make",
      field: "make",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      cellStyle: (params) =>
        params.value === "Toyota"
          ? { background: "pink" }
          : { background: "yellow" },
    },
    {
      headerName: "Model",
      field: "model",
    },
    {
      headerName: "Price",
      field: "price",
      tooltipField: "make",
      cellStyle: (params) =>
        params.value === 35000
          ? { background: "pink" }
          : { background: "yellow" },
      // cellClass:(params)=>(params.value === 'Toyota' ? 'Green': 'Red')   /* red and green are class so we can style at in app.css */
    },
    {
      headerName: "Action",
      field: "price",
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn btn-success"
            onClick={() => actionButton(params)}
          >
            clickme
          </button>
        </div>
      ),
    },
  ];

  //////// functions ///

  const defaultColDef = {
    sortable: true,
    editable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
  };

  ////// Export csv //////////

  let gridApi;

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };

  ///// Select single/multiple row  /////////////

  const rowSelectionType = "multiple";

  const onPaginationChange = (pageSize) => {
    gridApi.api.paginationSetPageSize(Number(pageSize))
  };

    ///// API Call /////

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((res) => res.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  return (
    <div className="container my-3">
      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => onExportClick()}
      >
        Download csv
      </button>
      <div class="example-header">
        Page Size:
        <select
          onChange={(e) => onPaginationChange(e.target.value)}
          id="page-size"
        >
          <option value="10" selected>
            10
          </option>
          <option value="100">100</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select>
      </div>
      <div
        className="ag-theme-alpine"
        id="myGrid"
        style={{ width: "100%", height: 500 }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={coloumns}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          enableBrowserTooltips={true}
          noRowsOverlayComponent={MyNoRowsOverlay}
          loadingOverlayComponent={MyLoadingOverlay}
          rowSelection={rowSelectionType}
          rowMultiSelectWithClick={true}
          pagination={true}
          paginationPageSize={10}
          // paginationAutoPageSize={true}
        />
      </div>
    </div>
  );
};

export default Table;
