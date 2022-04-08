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

export function getEventsFromFirestore(observer: any) {
  return db.collection(`events`).onSnapshot(observer);
}
