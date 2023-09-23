import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import BetsList from './BetsList/BetsTable';
import BetInput from './BetInput/BetInput';
import { getBets } from './utils/getBets';

import type { BetSingleType } from 'types';

const ListContainer = styled.div`
  padding: 10px;
  max-width: 1000px;
`;

function App() {
  const [bets, setBets] = useState<BetSingleType[]>([]);

  useEffect(() => {
    const fetchBets = async () => {
      const fetchedBets = (await getBets()) as BetSingleType[];

      console.log({ fetchedBets });

      setBets(fetchedBets);
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
