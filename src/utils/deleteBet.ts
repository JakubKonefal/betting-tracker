import { doc, deleteDoc } from 'firebase/firestore';

import { firestoreDB2 } from '../firebase/config';

export async function deleteBet(id: string) {
  await deleteDoc(doc(firestoreDB2, 'bets', id));
}
