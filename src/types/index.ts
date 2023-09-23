export type Result = 'win' | 'lose' | 'cashout';

export type BetSingleType = {
  id: number;
  odds: number;
  stake: number;
  result: Result;
  date: string;
  predefinedPayout: number;
  cashout: boolean;
  live: boolean;
};
