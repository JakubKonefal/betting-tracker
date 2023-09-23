import { collection, doc, setDoc } from 'firebase/firestore';
import { firestoreDB2 } from '../firebase/config';

import type { BetSingleType } from 'types';

type NewBet = Omit<BetSingleType, 'id'>;

export async function addBet(newBet: NewBet, newBetNumber: number) {
  const newCityRef = doc(collection(firestoreDB2, 'bets'));
  await setDoc(newCityRef, newBet);
}
