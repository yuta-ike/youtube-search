import config from './config.js';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// firebaseApp
export const firebaseApp = firebase.initializeApp(config);



//firestore
const firebaseDb = firebaseApp.firestore();
//urlsへの参照を取得
const videos = firebaseDb.collection('videos')
//クエリ実行関数
const doQuery = async (...query) => await videos.where(...query).get()

//url取得関数
export const searchVideo = async name => {
  (await doQuery('name','==',name)).docs.forEach(document => {
      console.log(document.data())
  })
}
searchVideo('sample')


//url追加関数
export const addVideo = async ({name, url}) => {
  //値の検証
  if(typeof name != "string" || !url.match(/^https:\/\/www.youtube.com\//)){
    console.error('データベースに登録できません。フォーマットが違います')
    return
  }

  //重複チェック
  if(!(await doQuery('url', '==', url)).empty){
    console.error('データベースに登録できません。既に存在しているurlです')
    return
  }

  //追加
  videos.add({name, url})
}
// addVideo({name:'sample4', url:'https://www.youtube.com/sample4'})


//auth
const providerGoogle = new firebase.auth.GoogleAuthProvider();
//login
export const loginGoogle = async () => {
  await firebase.auth().signInWithRedirect(providerGoogle)
}

export const logoutGoogle = async () => {
  await firebase.auth().signOut()
}
