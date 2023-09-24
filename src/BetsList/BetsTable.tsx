import React from 'react';
import styled from 'styled-components';

import Bet from './Bet';
import { calculatePayout } from '../utils/calculatePayout';

import type { BetSingleType } from 'types';

type Props = {
  bets: BetSingleType[];
};

const List = styled.div`
  border-left: 2px solid #ccc;
  border-right: 2px solid #ccc;
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
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
  const totalStake = bets.reduce((acc, bet) => acc + bet.stake, 0).toFixed(2);
  const totalPayout = bets
    .filter((bet) => bet.result !== 'lose')
    .reduce(
      (acc, bet) =>
        acc + Number(calculatePayout(bet.odds, bet.stake, bet.cashoutValue)),
      0
    )
    .toFixed(2);

  const totalLives = bets.filter((bet) => bet.live).length;

  const convertToDateObject = (dateString: string) => {
    //  Convert a "dd/MM/yyyy" string into a Date object
    let d = dateString.split('/');
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    // @ts-ignore
    return dat;
  };

  const betsWithMappedDates = bets.map((bet) => ({
    ...bet,
    date: convertToDateObject(bet.date.replaceAll('.', '/')),
  }));

  const betsSortedByDate = betsWithMappedDates.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <List>
      <ListHeader>
        <Cell>odds</Cell>
        <Cell>stake</Cell>
        <Cell>result</Cell>
        <Cell>payout</Cell>
        <Cell>live</Cell>
        <Cell>date</Cell>
      </ListHeader>
      <AllBets>
        {betsSortedByDate.map((bet, index) => (
          <Bet
            key={`bet-${index}`}
            {...bet}
            date={bet.date.toLocaleDateString()}
          />
        ))}
      </AllBets>
      <ListSummary>
        <Cell>-</Cell>
        <Cell>{totalStake}</Cell>
        <Cell>-</Cell>
        <Cell>{totalPayout}</Cell>
        <Cell>{totalLives}</Cell>
        <Cell>-</Cell>
      </ListSummary>
    </List>
  );
};

export default BetsTable;
