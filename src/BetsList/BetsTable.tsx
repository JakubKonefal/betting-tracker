import React from 'react';
import styled from 'styled-components';

import Bet, { BetSingleType } from './Bet';
import { calculatePayout } from '../utils/calculatePayout';

type Props = {
  bets: BetSingleType[];
};

const List = styled.div`
  border-left: 2px solid #ccc;
  border-right: 2px solid #ccc;
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 0 8px;
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
`;

const ListSummary = styled(ListHeader)`
  border-top: none;
`;

const Cell = styled.div`
  position: relative;
  padding: 8px 4px;
  font-weight: bold;

  &:not(:last-child) {
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 1px;
      background-color: #ccc;
    }
  }
`;

const AllBets = styled.div`
  display: grid;
`;

const BetsTable: React.FC<Props> = ({ bets }) => {
  const totalStake = bets.reduce((acc, bet) => acc + bet.stake, 0);
  const totalPayout = bets.reduce(
    (acc, bet) => acc + Number(calculatePayout(bet.odds, bet.stake)),
    0
  );

  return (
    <List>
      <ListHeader>
        <Cell>odds</Cell>
        <Cell>stake</Cell>
        <Cell>payout</Cell>
        <Cell>result</Cell>
        <Cell>date</Cell>
      </ListHeader>
      <AllBets>
        {bets.map((bet, index) => (
          <Bet key={`bet-${index}`} {...bet} />
        ))}
      </AllBets>
      <ListSummary>
        <Cell>-</Cell>
        <Cell>{totalStake}</Cell>
        <Cell>{totalPayout}</Cell>
        <Cell>-</Cell>
        <Cell>-</Cell>
      </ListSummary>
    </List>
  );
};

export default BetsTable;
