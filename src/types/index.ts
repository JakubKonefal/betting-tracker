export type Result = 'win' | 'lose' | 'cashout';

export type BetSingleType = {
  id: string;
  odds: number;
  stake: number;
  result: Result;
  date: string;
  cashoutValue: number;
  cashout: boolean;
  live: boolean;
};
