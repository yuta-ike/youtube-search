import 'firebase/firestore'
import firebaseApp from './index.js'

// firestore
const firebaseDb = firebaseApp.firestore();
// urlsへの参照を取得
export const videodb = firebaseDb.collection('videos')
export const userdb = firebaseDb.collection('user')
export const configdb = firebaseDb.collection('config')
export const infodb = firebaseDb.collection('info')
export const foldersdb = firebaseDb.collection('folders')