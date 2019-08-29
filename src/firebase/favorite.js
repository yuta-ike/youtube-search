import firebase from 'firebase/app';
import { userdb } from './core/database.js'
import user from './user.js'

export const addFavorite = async (vid) => {
  if(user.loggedIn){
    userdb.doc(user.uid).update({
      favorites: firebase.firestore.FieldValue.arrayUnion(vid)
    })
    if(!user.favorites.includes(vid)) user.favorites.push(vid)
  }else{
    console.log("please log in!")
    return false
  }
  return true
}

export const removeFavorite = async (vid) => {
  if(user.loggedIn){
    userdb.doc(user.uid).update({
      favorites: firebase.firestore.FieldValue.arrayRemove(vid)
    })
    user.favorites = user.favorites.filter(x => x != vid)
  }else{
    console.log("please log in!")
    return false
  }
  return true
}

export const isFavorite = vid => {
  if(!user.loggedIn) return false
  return user.favorites.includes(vid)
}
