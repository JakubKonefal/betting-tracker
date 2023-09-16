import { collection, getDocs } from 'firebase/firestore/lite';

import { Firestore } from 'firebase/firestore/lite';

export async function getBets(db: Firestore) {
  const betsCol = collection(db, 'bets');
  const betSnapshot = await getDocs(betsCol);
  const betList = betSnapshot.docs.map((doc) => doc.data());

  console.log(betList);

  return betList;
}
