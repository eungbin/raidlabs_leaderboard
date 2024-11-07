import React, { useState, useEffect } from 'react';
import './App.css';

interface Props {}

const App = ({  }: Props) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch(`https://gateway.pinata.cloud/ipfs/bafkreia2tigtk5kv5x6mptrscob7rwyvooyzte2j7luimkfssvm3m2zf54`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <div className="container">

    </div>
  );
};

export default App;