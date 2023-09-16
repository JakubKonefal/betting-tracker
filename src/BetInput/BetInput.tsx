import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { addBet } from '../utils/addBet';

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
  display: flex;
  align-items: center;

  width: 100%;
`;

const Input = styled.input`
  width: 25%;
  height: 37px;
  padding: 0 8px;
  border-radius: 0;
  border: 2px solid #ccc;
  outline: none;

  &:not(:first-child) {
    border-left: none;
  }
`;

const PlusWrapper = styled.button`
  margin-left: auto;
  width: 50px;
  height: 50px;

  border-radius: 50%;
  outline: none;
  border: none;
  background-color: green;
  color: white;
  font-weight: bold;
  font-size: 20px;

  &:disabled {
    opacity: 0.65;
  }
`;

const BetInput: React.FC<Props> = ({ newBetNumber }) => {
  const [odds, setOdds] = useState<string>('');
  const [stake, setStake] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const handleAddBet = () => {
    addBet(
      {
        odds: Number(odds),
        stake: Number(stake),
        result: Boolean(result),
        date: date,
      },
      newBetNumber
    );
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
          id='date'
          type='text'
          placeholder='Date'
          onChange={(event) => setDate(event.target.value)}
          value={date}
        />
      </BetCombinedInputsWrapper>
      <PlusWrapper
        type='button'
        disabled={!odds || !stake || !result || !date}
        onClick={handleAddBet}
      >
        +
      </PlusWrapper>
    </Wrapper>
  );
};

export default BetInput;
