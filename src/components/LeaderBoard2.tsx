import React, { useState, useEffect } from 'react';
import '../css/LeaderBoard2.css';
import SelectBox from './SelectBox';

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

export default function LeaderBoard2(props: IProps) {
  const [rowData, setRowData] = useState([]);  // table's all data
  const [renderData, setRenderData] = useState([]); // table's render data
  const [page, setPage] = useState<number>(1); // table's now page
  const [itemPerPage, setItemPerPage] = useState(10); // table's item count per page

  useEffect(() => {
    const data = [...props.data];
    setRowData([...data]);
  }, [props]);

  useEffect(() => {
    setRenderData([...rowData].slice((page-1)*itemPerPage, page*itemPerPage));
  }, [page, rowData]);

  return (
    <div className='container-leaderboard'>
      <table className='leaderboard-table'>
        <thead>
          <tr className='leaderboard-header-row'>
            <th className='table-inner-padding'>Rank</th><th>Player Name</th>
            <th>Guild Name</th><th>Score</th>
            <th>Wins</th><th>Losses</th>
            <th>Win Rate</th>
          </tr>
        </thead>
        <tbody>
          {renderData?.map((v: IBoard, idx: number) => (
            <tr className='leaderboard-content-row' key={idx}>
              <td className='table-inner-padding row-border-radius-left'>{v.rank}</td>
              <td>{v.playerName}</td>
              <td>{v.guildName}</td>
              <td>{v.score}</td>
              <td>{v.wins}</td>
              <td>{v.losses}</td>
              <td className='row-border-radius-right'>{v.winRate}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className='table-footer-padding'>
              <SelectBox onChangeFunc={setItemPerPage} itemPerPage={itemPerPage} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}