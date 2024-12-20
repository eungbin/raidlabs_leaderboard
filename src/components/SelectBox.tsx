import React, { useState, useEffect } from 'react';
import '../css/SelectBox.css';

interface IProps {
  onChangeFunc: any;
  itemPerPage: number;
}

export default function SelectBox(props: IProps) {
  const [state, setState] = useState<number>(props.itemPerPage);

  const _changeItemPerPage = (e: any) => {
    setState(parseInt(e.target.value));
  }

  useEffect(() => {
    props.onChangeFunc(state);
  }, [state]);

  return (
    <select className="form-select" onChange={_changeItemPerPage} value={state}>
      <option value={10}>{10}</option>
      <option value={20}>{20}</option>
    </select>  
  )
}