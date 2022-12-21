import React from 'react'
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const Table = () => {

const data = [
    { make: "Porsche", model: "Boxter", price: 72000 },
  { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Toyota", model: "Celica", price: 35000 },
  { make: "Toyota", model: "Celica", price: 35000 },
  { make: "Porsche", model: "Boxter", price: 72000 },
  { make: "Toyota", model: "Celica", price: 35000 },
  { make: "Toyota", model: "Celica", price: 35000 },
  { make: "Porsche", model: "Boxter", price: 72000 },
  { make: "Porsche", model: "Boxter", price: 72000 },
  { make: "Porsche", model: "Boxter", price: 72000 },
  { make: "Toyota", model: "Celica", price: 35000 },
  { make: "Porsche", model: "Boxter", price: 72000 },
  { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Porsche", model: "Boxter", price: 72000 },
  { make: "Porsche", model: "Boxter", price: 72000 },
  { make: "Porsche", model: "Boxter", price: 72000 }
];

const coloumns =[
    {
        headerName:'Make', field:'make',
    },
    {
        headerName:'Model', field:'model'
    },
    {
        headerName:'Price', field:'price'
    },
];

const defaultColDef= {
    sortable:true, editable:true, filter:true
}

  return (
    <div className="ag-theme-alpine" style={{width: 500, height: 500}}>
    <AgGridReact rowData={data} columnDefs={coloumns} defaultColDef={defaultColDef} />
    </div>
  )
}

export default Table