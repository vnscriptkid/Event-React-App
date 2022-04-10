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

export function addEventToFirestore(event: any) {
  return db.collection(`events`).add({
    ...event,
    hostUid: "uid",
    hostedBy: "thanh",
    hostPhotoURL:
      "https://meragor.com/files/styles//220_220_bottom_wm/avatar-211923-001916.png" ||
      null,
    // attendees: arrayUnion({
    //   id: user.uid,
    //   displayName: user.displayName,
    //   photoURL: user.photoURL || null
    // }),
  });
}
