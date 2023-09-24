const TAX_RATE = 0.88;

export const calculatePayout = (
  odds: number,
  stake: number,
  cashoutValue?: number
) => {
  if (cashoutValue) {
    return cashoutValue;
  }

  return (odds * stake * TAX_RATE).toFixed(2);
};
