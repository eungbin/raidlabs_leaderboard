import React, { useState, useEffect } from 'react';
import LeaderBoard from './components/LeaderBoard';
import LeaderBoard2 from './components/LeaderBoard2';
import './App.css';

interface Props {}
interface IBoard {
  rank: number;
  playerName: string;
  guildName: string;
  score: number;
  wins: number;
  losses: number;
  winRate: number;
}

const App = ({  }: Props) => {
  const [data, setData] = useState<IBoard[]>([]);
  
  useEffect(() => {
    fetch(`https://gateway.pinata.cloud/ipfs/bafkreia2tigtk5kv5x6mptrscob7rwyvooyzte2j7luimkfssvm3m2zf54`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      res.sort((a, b) => {
        if(a.score > b.score) return -1;
        else return 1;
      })
      
      const boardData: IBoard[] = res.map((v, idx) => {
        return { rank: idx+1, playerName: v.player.name, guildName: !!v.player.guild ? v.player.guild.name : '', score: v.score,
                wins: v.wins, losses: v.losses, winRate: (v.wins/(v.wins+v.losses)*100).toFixed(2)}
      })

      setData(boardData);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <div className="container">
      {/* <LeaderBoard data={data} /> */}
      <LeaderBoard2 data={data} />
    </div>
  );
};

export default App;