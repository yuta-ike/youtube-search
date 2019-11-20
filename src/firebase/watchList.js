import firebase from 'firebase/app';
import { userdb } from './core/database.js'
import user from './user.js'

export const push = async (vid) => {
  if(user.loggedIn){
    console.log(user.watchList)
    userdb.doc(user.uid).update({
      watchList: firebase.firestore.FieldValue.arrayUnion(vid)
    })
    if(!user.watchList.includes(vid)) user.watchList.push(vid)
  }else{
    console.log("please log in!")
    return false
  }
  return true
}

export const remove = async (vid) => {
  if(user.loggedIn){
    userdb.doc(user.uid).update({
      watchList: firebase.firestore.FieldValue.arrayRemove(vid)
    })
    user.watchList = user.watchList.filter(x => x != vid)
  }else{
    console.log("please log in!")
    return false
  }
  return true
}

export const show = () => {
  if(!user.loggedIn) return false
  return user.watchList
}
