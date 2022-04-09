import { firebase } from "../config/firebase";

const db = firebase.firestore();

export function dataFromSnapshot(snapshot: any) {
  if (!snapshot.exists) return undefined;

  const data = snapshot.data();

  //   for (const key in data) {
  //     if (data[key] instanceof firebase.firestore.Timestamp) {
  //       data[key] = data[key].toDate();
  //     }
  //   }

  return {
    ...data,
    id: snapshot.id,
  };
}

export function listenToEventsFromFirestore() {
  return db.collection(`events`);
}

export function listenToEventFromFirestore(eventId: string) {
  return db.collection(`events`).doc(eventId);
}
