import React, { useState, useEffect, useRef } from 'react';
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

interface ISorted {
  sorted: boolean;
  category: 'score' | 'wins' | 'losses' | 'winRate' | 'none';
  desc: 'desc' | 'asc' | 'none';
}

export default function LeaderBoard2(props: IProps) {
  const [rowData, setRowData] = useState<IBoard[]>([]);  // table's all data
  const [renderData, setRenderData] = useState<IBoard[]>([]); // table's render data
  const [sortedData, setSortedData] = useState<IBoard[]>([]); // table's sorted data
  const [sorted, setSorted] = useState<ISorted>({ sorted: false, category: 'none', desc: 'none' }) // table's sorted status
  const [page, setPage] = useState<number>(1); // table's now page
  const [itemPerPage, setItemPerPage] = useState<number>(10); // table's item count per page
  const lastPage = useRef<number>(1); // table's last page

  useEffect(() => {
    const data = [...props.data];
    setRowData([...data]);
  }, [props]);

  useEffect(() => {
    _genRenderData();
    lastPage.current = rowData.length <= itemPerPage ? 1 : rowData.length/itemPerPage + (rowData.length%itemPerPage !== 0 ? 1 : 0);
  }, [page, rowData, itemPerPage]);

  const _handleItemPerPage = (perPage: number) => {
    setItemPerPage(perPage);
  }

  const _goFirstPage = () => { setPage(1); }
  const _goLastPage = () => { setPage(lastPage.current); }
  const _goPrevPage = () => { if(page === 1) return; setPage(page-1); }
  const _goNextPage = () => { if(page === lastPage.current) return; setPage(page+1); }

  const _sortTable = (e: any, category: string) => {
    const headerElems = e.target.parentElement.children;

    for(let i=3; i<headerElems.length; i++) {
      headerElems[i].removeAttribute('id');
    }

    if(!sorted.sorted) {
      setSorted({ sorted: true, desc: 'desc', category: category });                                    // 해당 카테고리 내림차순 정렬
      e.target.id = 'sorted';
    } else {
      if(sorted.category === category) {
        if(sorted.desc === 'desc') { setSorted({ sorted: true, desc: 'asc', category: category }); e.target.id = 'sorted'; }    // 해당 카테고리 오름차순 정렬
        else if(sorted.desc === 'asc') { setSorted({ sorted: false, desc: 'none', category: 'none'}); } // sort 초기화
      } else {
        setSorted({ sorted: true, desc: 'desc', category: category });                                  // 해당 카테고리 내림차순 정렬
        e.target.id = 'sorted';
      }
    }
  }

  useEffect(() => {
    if(!sorted.sorted) _genRenderData();
    else _genSortedData();
  }, [sorted]);

  useEffect(() => {
    _genRenderData();
  }, [sortedData]);

  const _genSortedData = () => {
    const dummyData: IBoard[] = [...rowData].sort((a, b) => {
      if(sorted.desc === 'desc') {
        if(a[sorted.category] > b[sorted.category]) return -1;
        else return 1;
      } else if(sorted.desc === 'asc') {
        if(a[sorted.category] > b[sorted.category]) return 1;
      else return -1;
      }
    });

    setSortedData([...dummyData]);
  }

  const _genRenderData = () => {
    if(!sorted.sorted) { setRenderData([...rowData]?.slice((page-1)*itemPerPage, page*itemPerPage)); } // 초기 score 내림차순 상태
    else { setRenderData([...sortedData]?.slice((page-1)*itemPerPage, page*itemPerPage)); }
  }

  return (
    <div className='container-leaderboard'>
      <table className='leaderboard-table'>
        <thead>
          <tr className='leaderboard-header-row'>
            <th className='table-inner-padding'>Rank</th><th>Player Name</th>
            <th>Guild Name</th><th className='clickable none-drag' onClick={(e) => _sortTable(e, 'score')} id='test'>Score</th>
            <th className='clickable none-drag' onClick={(e) => _sortTable(e, 'wins')}>Wins</th>
            <th className='clickable none-drag' onClick={(e) => _sortTable(e, 'losses')}>Losses</th>
            <th className='clickable none-drag' onClick={(e) => _sortTable(e, 'winRate')}>Win Rate</th>
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
            <td className='table-footer table-footer-padding' colSpan={7}>
              <div className='table-footer-container'>
                <div className='table-footer-left-container'>
                  <SelectBox onChangeFunc={_handleItemPerPage} itemPerPage={itemPerPage} />
                </div>
                <div className='table-footer-right-container'>
                  <span className='arrow-size clickable none-drag' onClick={_goFirstPage}>{'<<'}</span>
                  <span className='arrow-size clickable none-drag' onClick={_goPrevPage}>{'<'}</span>
                  <span className='arrow-size'>{page}</span>
                  <span className='arrow-size clickable none-drag' onClick={_goNextPage}>{'>'}</span>
                  <span className='arrow-size clickable none-drag' onClick={_goLastPage}>{'>>'}</span>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}