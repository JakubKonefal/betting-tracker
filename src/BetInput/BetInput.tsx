import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { addBet } from '../utils/addBet';

import type { Result } from 'types';

type Props = {
  newBetNumber: number;
};

const Wrapper = styled.div`
  display: grid;
  row-gap: 20px;
  margin-top: 40px;
  width: 100%;
`;

const BetCombinedInputsWrapper = styled.div`
  display: grid;

  width: 100%;
`;

const Input = styled.input`
  width: 200px;
  height: 37px;
  padding: 0 8px;
  box-sizing: border-box;
  border-radius: 0;
  border: 2px solid #ccc;
  outline: none;

  &:not(:first-child) {
    border-top: none;
  }
`;

const PlusWrapper = styled.button`
  position: relative;
  width: 50px;
  height: 50px;

  border-radius: 50%;
  outline: none;
  border: none;
  background-color: green;
  color: white;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;

  &:disabled {
    opacity: 0.65;
  }

  &:hover {
    background-color: darkgreen;
  }
`;

const Message = styled.div<{ error?: boolean }>`
  position: absolute;
  top: 50%;
  right: -15px;
  transform: translate(100%, -50%);

  color: green;

  ${({ error }) =>
    error &&
    css`
      color: red;
    `}
`;

const BetInput: React.FC<Props> = ({ newBetNumber }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [odds, setOdds] = useState<string>('');
  const [stake, setStake] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [predefinedPayout, setPredefinedPayout] = useState<string>('');
  const [cashout, setCashout] = useState<string>('');
  const [live, setLive] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const parseResult = (result: string): Result => {
    if (result === '0') {
      return 'lose';
    }

    if (result === '1') {
      return 'win';
    }

    if (result === '2') {
      return 'cashout';
    }

    throw new Error('Result must be 1 or 2 or 3!');
  };

  const handleAddBet = () => {
    setLoading(true);

    const parsedResult: Result = parseResult(result);

    addBet(
      {
        odds: Number(odds),
        stake: Number(stake),
        result: parsedResult,
        predefinedPayout: Number(predefinedPayout),
        cashout: Boolean(cashout),
        live: Boolean(live),
        date: date,
      },
      newBetNumber
    )
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setOdds('');
        setStake('');
        setResult('');
        setPredefinedPayout('');
        setCashout('');
        setDate('');
        setLive('');
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  return (
    <Wrapper>
      <BetCombinedInputsWrapper>
        <Input
          id='odds'
          type='text'
          placeholder='Odds'
          onChange={(event) => setOdds(event.target.value)}
          value={odds}
        />
        <Input
          id='stake'
          type='text'
          placeholder='Stake'
          onChange={(event) => setStake(event.target.value)}
          value={stake}
        />
        <Input
          id='result'
          type='text'
          placeholder='Result'
          onChange={(event) => setResult(event.target.value)}
          value={result}
        />
        <Input
          id='predefined-payout'
          type='text'
          placeholder='Predefined payout'
          onChange={(event) => setPredefinedPayout(event.target.value)}
          value={predefinedPayout}
        />
        <Input
          id='cashout'
          type='text'
          placeholder='Cashout'
          onChange={(event) => setCashout(event.target.value)}
          value={cashout}
        />
        <Input
          id='live'
          type='text'
          placeholder='Live'
          onChange={(event) => setLive(event.target.value)}
          value={live}
        />
        <Input
          id='date'
          type='text'
          placeholder='Date'
          onChange={(event) => setDate(event.target.value)}
          value={date}
        />
      </BetCombinedInputsWrapper>
      <PlusWrapper
        type='button'
        disabled={!odds || !stake || !result || !date || loading}
        onClick={handleAddBet}
      >
        {loading ? '...' : '+'}

        {(error || success) && (
          <Message error={error}>
            {error ? 'Błąd podczas dodawania!' : 'Bet dodany!'}
          </Message>
        )}
      </PlusWrapper>
    </Wrapper>
  );
};

export default BetInput;
