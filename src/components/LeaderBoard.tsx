import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface IBoard {
  rank: number;
  playerName: string;
  guildName: string;
  score: number;
  wins: number;
  losses: number;
  winRate: number;
}

interface IProps {
  data: IBoard[];
}

export default function LeaderBoard(props: IProps) {
  const [colDefs, setColDefs] = useState([
    { field: "rank", sortable: false },
    { field: "playerName", sortable: false },
    { field: "guildName", sortable: false },
    { field: "score" },
    { field: "wins" },
    { field: "losses" },
    { field: "winRate" },
  ]);

  const [rowData, setRowData] = useState([]);

  const autoSizeStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 100
  }

  useEffect(() => {
    const data = [...props.data];
    setRowData([...data]);
  }, [props]);

  return (
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: 540 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20]}
        autoSizeStrategy={autoSizeStrategy}
      />
    </div>
  );
}