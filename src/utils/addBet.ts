import { collection, doc, setDoc, addDoc } from 'firebase/firestore';
import { firestoreDB2 } from '../firebase/config';

import type { BetSingleType } from '../BetsList/Bet';

type NewBet = Omit<BetSingleType, 'id'>;

export async function addBet(newBet: NewBet, newBetNumber: number) {
  // Add a new document with a generated id
  const newCityRef = doc(collection(firestoreDB2, 'bets'));

  // later...
  await setDoc(newCityRef, newBet);
}
