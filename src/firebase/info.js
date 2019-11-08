import firebase from 'firebase/app';
import { infodb } from './core/database.js'
import user from './user.js'

export const getInfo = async (limit = null) => {
  const infos = limit != null ? await infodb.orderBy('date', 'desc').limit(limit).get()
                              : await infodb.orderBy('date', 'desc').get()
  const result = []
  infos.forEach(info => {
    const obj = info.data()
    obj.date = obj.date.toDate()
    result.push(obj)
  })
  return result
}

export const notify = async message => {
  console.log(message, user.accountTypeInJapanese())
  await infodb.add({
    generator: user.accountTypeInJapanese(),
    message,
    date: firebase.firestore.FieldValue.serverTimestamp()
  })
}
