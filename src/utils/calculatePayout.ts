const TAX_RATE = 0.88;

export const calculatePayout = (odds: number, stake: number) => {
  return (odds * stake * TAX_RATE).toFixed(2);
};
