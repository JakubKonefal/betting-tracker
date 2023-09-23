export type BetSingleType = {
  id: number;
  odds: number;
  stake: number;
  result: boolean;
  date: string;
  predefinedPayout?: number;
  cashout?: boolean;
};
