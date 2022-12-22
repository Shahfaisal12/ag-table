import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import MyLoadingOverlay from './myLoadingOverlay';
import MyNoRowsOverlay from './myNoRowsOverlay';

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

const actionButton =(params) =>{
    console.log(params);
    alert(`${params.data.model} ${params.data.price}`);
}

const coloumns =[
    {
        headerName:'Make', field:'make', checkboxSelection:true, headerCheckboxSelection:true, 
        cellStyle:(params)=>(params.value === 'Toyota' ? {background:'pink'}: {background:'yellow'})
    },
    {
        headerName:'Model', field:'model'
    },
    {
        headerName:'Price', field:'price', tooltipField:'make',
        cellStyle:(params)=>(params.value === 35000 ? {background:'pink'}: {background:'yellow'})
        // cellClass:(params)=>(params.value === 'Toyota' ? 'Green': 'Red')   /* red and green are class so we can style at in app.css */
    },
    {
        headerName:'Action', field:'price',
         cellRendererFramework: (params)=> <div>
         <button className='btn btn-success' onClick={()=>actionButton(params)}>clickme</button>
         </div>
    }
];

const defaultColDef= {
    sortable:true, editable:true, filter:true, floatingFilter:true, flex:1
}

let gridApi;

const onGridReady = (params) =>{
    gridApi=params.api
}

const onExportClick = () => {
    gridApi.exportDataAsCsv();
}

const rowSelectionType='multiple';

useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
    .then(result => result.json())
    .then(rowData => setRowData(rowData))
 }, []);

  return (
    <div className='container my-5'>
    <button className='btn btn-outline-primary mb-5' onClick={()=>onExportClick()}>Download csv</button>
    <div className="ag-theme-alpine" id='myGrid' style={{width: '100%', height: 500}}>
    <AgGridReact rowData={rowData}
     columnDefs={coloumns}
    defaultColDef={defaultColDef}
    onGridReady={onGridReady}
    enableBrowserTooltips={true}
    noRowsOverlayComponent={MyNoRowsOverlay}
    loadingOverlayComponent={MyLoadingOverlay}
    rowSelection={rowSelectionType}
    rowMultiSelectWithClick={true} />
    </div>
    </div>
  )
}

export default Table