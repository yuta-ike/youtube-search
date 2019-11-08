import { userdb } from './core/database.js'

const emptyUser = {
  accountType: "NORMAL",
  uid: null,
  uname: "",
  token: null,
  favorites: [],
  valid: false,
  settings:{
    itemsPerRow: 4,
    itemsPerColumn: 3,
    sort: 'index',
  }
}

const databaseKey = ['accountType', 'uname', 'favorites', 'valid', 'settings']

const user = new class User{
  constructor(){
    this._loggedIn = false
    Object.assign(this, emptyUser)
  }

  setData(data){
    Object.assign(this, data)
  }

  getData(){
    return databaseKey.reduce((obj, key) => (obj[key] = this[key], obj), {})
  }

  get loggedIn(){
    return this._loggedIn
  }

  set loggedIn(value){
    this._loggedIn = value
    if(!value){
      Object.assign(this, emptyUser)
    }
  }

  hasAdminAuth(){
    return this.accountType === 'ADMINISTRATOR' || this.accountType === 'DEVELOPER'
  }

  hasDeveloperAuth(){
    return this.accountType === 'DEVELOPER'
  }

  hasMasterAuth(){
    return this.accountType === 'MASTER'
  }

  accountTypeInJapanese(){
    return this.accountType == 'ADMINISTRATOR' ? '管理者' : this.accountType == 'DEVELOPER' ? '開発者' : this.accountType == 'MASTER' ? 'マスター' : '一般'
  }

  changeUname(uname){
    userdb.doc(this.uid).update({uname})
  }
}

export default Object.seal(user)

export const settings = Object.freeze(user.settings)
