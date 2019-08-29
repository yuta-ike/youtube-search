import firebase from 'firebase/app';
import 'firebase/auth';
import user from './user.js'
import { userdb } from './core/database.js'

//login
export const loginGoogle = async (isLoginWithMasterAccount = false) => {
  const providerGoogle = new firebase.auth.GoogleAuthProvider()
  console.log(isLoginWithMasterAccount)
  if(isLoginWithMasterAccount === true) providerGoogle.addScope('https://www.googleapis.com/auth/youtube')

  await firebase.auth().signInWithRedirect(providerGoogle)
}

firebase.auth().getRedirectResult().then(response => {
  if(response == null || response.credential == null) return
  const token = response.credential.accessToken
  user.token = token
})

export const loginWithEmail = async (email, password) => {
  const response = await firebase.auth().signInWithEmailAndPassword(email, password)
  const token = response.credential.accessToken
  user.token = token
}

export const logout = async () => {
  await firebase.auth().signOut()
}

export const authenticated = () => user.loggedIn && user.valid
export const masterAuthenticated = () => user.loggedIn && user.valid && user.accountType === 'MASTER'

export const hasAdminAuth = () => user.hasAdminAuth()
export const hasDeveloperAuth = () => user.hasDeveloperAuth()

export const getName = () => user.uname

const events = {}
export const onAuthStateChanged = (type, callback) => {
  events[type] = callback
}
const stateChange = (...arg) => {
  Object.values(events).forEach(callback => callback(...arg))
}

const getUserDataFromDb = async uid => {
  const data = (await userdb.doc(uid).get()).data()
  if(data == null) return null
  return Object.assign(data, {uid})
}

firebase.auth().onAuthStateChanged(async _user => {
  console.log(_user)
  if(_user != null){
    const userData = await getUserDataFromDb(_user.uid)
    console.log(userData)
    if(userData != null){
      if(userData.valid){
        user.setData({
          loggedIn: true,
          ...userData,
        })
        stateChange('SUCCESS', user)
      }else{
        user.loggedIn = false
        stateChange('WAITING')
        // logout() //これであってる？
      }
    }else{
      //新規登録
      user.setData({
        loggedIn: false,
        uid: _user.uid,
        valid: false,
        uname: _user.displayName,
      })
      console.log(user.getData())
      userdb.doc(_user.uid).set(user.getData())
      stateChange('WAITING')
      // logout() //これであってる？
    }
  }else{
    user.loggedIn = false
    stateChange('FAILURE')
  }
})
