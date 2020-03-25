import { firebase } from './';

const { firestore } = firebase;
const switchesRef = firestore.collection('switches');

// export const createSwitch = switchData => switchesRef
//   .add(switchData)
//   .then(ref => ref.id)

// export const getSwitch = (switchId, cb) => switchesRef
//   .doc(switchId)
//   .onSnapshot(
//     snapshot => cb(snapshot.data()), 
//     err => console.log
//   )

export const createSwitch = (switchName, switchData) => switchesRef
  .doc(switchName)
  .set(switchData)

export const getSwitch = (switchName, cb) => switchesRef
  .doc(switchName)
  .onSnapshot(
    snap => cb(snap.data()),
    err => console.log
  )

export const unusedSwitch = switchName => switchesRef
  .doc(switchName)
  .get()
  .then(doc => !doc.exists)