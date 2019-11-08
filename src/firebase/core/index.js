import firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/storage';
import config from './config.js';

const firebaseApp = firebase.initializeApp(config);
export default firebaseApp

export const functions = firebase.functions()
export const storage = firebase.storage()
