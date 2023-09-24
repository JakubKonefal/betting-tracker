import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { calculatePayout } from '../utils/calculatePayout';
import { deleteBet } from 'utils/deleteBet';

import type { BetSingleType } from 'types';

const BetWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border-bottom: 2px solid #ccc;
  padding: 0 8px;
`;

const Cell = styled.div<{
  green?: boolean;
  red?: boolean;
  yellow?: boolean;
  bold?: boolean;
}>`
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

    ${({ yellow }) =>
    yellow &&
    css`
      background-color: yellow;
    `}

    ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
`;

const MinusWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  right: -15px;
  transform: translate(100%, -50%);
  width: 26px;
  height: 26px;
  line-height: 26px;

  border-radius: 50%;
  outline: none;
  border: none;
  background-color: red;
  color: white;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;

  &:disabled {
    opacity: 0.65;
  }

  &:hover {
    background-color: darkred;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 44%;
    left: 48%;
    transform: translate(-50%, -50%);
  }
`;

const Message = styled.div<{ error?: boolean }>`
  position: absolute;
  top: 50%;
  right: -15px;
  transform: translate(100%, -50%);
  min-width: max-content;
  font-size: 14px;

  color: green;

  ${({ error }) =>
    error &&
    css`
      color: red;
    `}
`;

const Bet: React.FC<BetSingleType> = ({
  id,
  odds,
  stake,
  result,
  cashoutValue,
  live,
  date,
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const payout =
    result !== 'lose' ? calculatePayout(odds, stake, cashoutValue) : 0;

  const handleDeleteBet = (id: string) => {
    setLoading(true);

    deleteBet(id)
      .then(() => {
        setLoading(false);
        setSuccess(true);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  return (
    <BetWrapper>
      <MinusWrapper type='button' onClick={() => handleDeleteBet(id)}>
        <span> {loading ? '...' : '-'}</span>
        {(error || success) && (
          <Message error={error}>{error ? 'Błąd!' : 'Bet usunięty!'}</Message>
        )}
      </MinusWrapper>
      <Cell>{odds}</Cell>
      <Cell>{stake}</Cell>
      <Cell
        green={result === 'win'}
        red={result === 'lose'}
        yellow={result === 'cashout'}
      />
      <Cell>{payout}</Cell>
      <Cell bold={live}>{live ? 'YES' : 'NO'}</Cell>

      <Cell>{date}</Cell>
    </BetWrapper>
  );
};

export default Bet;
