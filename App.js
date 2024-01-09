import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import React, { useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import * as _ from 'lodash'

// Create new GridExample component
const GridExample = () => {
  // Row Data: The data to be displayed.
  const [rowData] = useState([
    {
      description: 'Voyager',
      expire: '',
      date: '2024-01-10',
      category: 'Fruits',
      price: 86580000,
      special: true,
    },
    {
      description: 'Apollo 13',
      expire: '',
      date: '2024-01-10',
      category: 'Vegetables',
      price: 3750000,
      special: false,
    },
    {
      description: 'Falcon 9',
      expire: '',
      date: '2024-01-10',
      category: 'Furniture',
      price: 9750000,
      special: true,
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState([
    { field: 'description', editable: true },
    { field: 'expire', sortable: false , 
    cellRenderer: AgGridCheckbox,
    editable: true},
    { field: 'date', editable: true },
    { field: 'category' , editable: true, filter: true},
    { field: 'price', editable: true },
    { field: 'special', editable: true },
  ]);

  const [gridApi, setGridApi] = useState(null);
  const onGridReady = params => {
    setGridApi(params.api);
  }

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className="ag-theme-quartz" style={{height: 500, width: 1500}}>
      <AgGridReact onGridReady={onGridReady} rowData={rowData} columnDefs={colDefs} rowSelection='multiple'/>
      <button type="button" align="left" onClick={() => gridApi.applyTransaction({ add: [{ }] })}>Add Product</button>
      <button type="button" align="left" onClick={_ => {
        const selectedRows = gridApi.getSelectedRows()
        gridApi.applyTransaction({ remove: selectedRows })
      }}>Delete Selected Product</button>
    </div>
    
  );
};

function AgGridCheckbox (props) {
    const [date, setDate] = useState('');
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  const boolValue = props.value && props.value.toString() === 'true';
  const [isChecked, setIsChecked] = useState(boolValue);
  const onChanged = () => {
    //props.setValue(!isChecked);
    setIsChecked(!isChecked);
   };
  return (
    <div>
      <input type="checkbox" checked={isChecked} onChange={onChanged} />
      {
             isChecked ? (
              <input
              type="date"
              onChange={handleChange}
              ref={dateInputRef}
            />
               ) : (<div></div>)
           }
    </div>
  );
}
export default GridExample;

