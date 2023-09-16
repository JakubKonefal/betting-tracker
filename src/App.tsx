import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import BetsList from './BetsList/BetsTable';
import BetInput from './BetInput/BetInput';
import { getBets } from './utils/getBets';

import type { BetSingleType } from './BetsList/Bet';

type BetSingleFromDB = {
  id: number;
  odds: number;
  stake: number;
  result: string;
  date: string;
};

const ListContainer = styled.div`
  padding: 10px;
  max-width: 600px;
`;

function App() {
  const [bets, setBets] = useState<BetSingleType[]>([]);

  useEffect(() => {
    const fetchBets = async () => {
      const bets = (await getBets()) as BetSingleFromDB[];

      const parsedBets = bets.map((bet) => ({
        ...bet,
        result: bet.result === '0' ? false : true,
      }));

      setBets(parsedBets);
    };

    fetchBets();
  }, []);

  return (
    <div className='App'>
      <ListContainer>
        <BetsList bets={bets} />
        <BetInput newBetNumber={bets.length + 1} />
      </ListContainer>
    </div>
  );
}

export default App;
