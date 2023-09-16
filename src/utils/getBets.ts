import { collection, getDocs } from 'firebase/firestore/lite';
import { firestoreDB } from '../firebase/config';

export async function getBets() {
  const betsCol = collection(firestoreDB, 'bets');
  const betSnapshot = await getDocs(betsCol);
  const betList = betSnapshot.docs.map((doc) => doc.data());

  return betList;
}
