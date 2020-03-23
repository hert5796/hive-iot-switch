import * as firebase from 'firebase'
import {config} from './config'


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const firestore = firebase.firestore();

export {
  firestore
};