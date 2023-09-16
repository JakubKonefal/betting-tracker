import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import BetsList from './BetsList/BetsTable';
import { getBets } from './utils/getBets';
import { firestoreDB } from './firebase/config';

import type { BetSingleType } from './BetsList/Bet';

const ListContainer = styled.div`
  padding: 10px;
`;

function App() {
  const [bets, setBets] = useState<BetSingleType[]>([]);

  useEffect(() => {
    const fetchBets = async () => {
      const bets = (await getBets(firestoreDB)) as BetSingleType[];
      console.log(bets);

      setBets(bets);
    };

    fetchBets();
  }, []);

  return (
    <div className='App'>
      <ListContainer>
        <BetsList bets={bets} />
      </ListContainer>
    </div>
  );
}

export default App;
