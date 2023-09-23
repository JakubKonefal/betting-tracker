import React from 'react';
import styled, { css } from 'styled-components';
import { calculatePayout } from '../utils/calculatePayout';

import type { BetSingleType } from 'types';

const BetWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border-bottom: 2px solid #ccc;
  padding: 0 8px;
`;

const Cell = styled.div<{ green?: boolean; red?: boolean }>`
  position: relative;
  padding: 8px 4px;

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

  ${({ green }) =>
    green &&
    css`
      background-color: green;
    `}

  ${({ red }) =>
    red &&
    css`
      background-color: red;
    `}
`;

const Bet: React.FC<BetSingleType> = ({ id, odds, stake, result, date }) => {
  const payout = result ? calculatePayout(odds, stake) : 0;

  return (
    <BetWrapper>
      <Cell>{odds}</Cell>
      <Cell>{stake}</Cell>
      <Cell>{payout}</Cell>
      <Cell green={result} red={!result} />
      <Cell>{date}</Cell>
    </BetWrapper>
  );
};

export default Bet;
