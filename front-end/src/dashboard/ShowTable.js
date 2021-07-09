import React from "react";
import { useHistory } from "react-router";
import { deleteSeat } from "../utils/api";
function ShowTable({ table, setTablesError }){
    const isOccupied = table.reservation_id > 0;
    const status = isOccupied ? "Occupied" : "Free";
    const classNameRow = isOccupied ? " bg-secondary" : ""; //className for table row
    const classNameStatus = isOccupied ? "p-2 rounded bg-danger text-light rounded-pill" : "p-2 border rounded-pill" // className for status span


    const history = useHistory();
    const finishClickHandler = () =>{
        if (window.confirm( "Is this table ready to seat new guests? This cannot be undone.")){
            deleteSeat(table.table_id)
                .then(history.push("/dashboard"))
                .catch(setTablesError);
        }
    }

    return(
    <tr className={classNameRow}>
        <td>{table.table_id}</td>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td>{table.reservation_id}</td>
        <td data-table-id-status={table.table_id} ><span className={classNameStatus}>{status}</span></td>
        <td data-table-id-finish={table.table_id}>
            { 
                isOccupied && 
                    <button type="button"  onClick={finishClickHandler} className="btn btn-success border border-2">
                        Finish
                    </button>
            }
        </td>
    </tr>
    );
}

export default ShowTable;