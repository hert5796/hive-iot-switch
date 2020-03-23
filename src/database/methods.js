import { firebase } from './';

const { firestore } = firebase;
const switchesRef = firestore.collection('switches');

export const createSwitch = switchData => switchesRef
  .add(switchData)
  .then(ref => ref.id)

export const getSwitch = (switchId, cb) => switchesRef
  .doc(switchId)
  .onSnapshot(
    snapshot => cb(snapshot.data()), 
    err => console.log
  )