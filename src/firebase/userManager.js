import { userdb } from './core/database.js'

export const getInvalidUsers = async () => {
  const invalidUsers = await userdb.where('valid', '==', false).get()
  return invalidUsers.docs.map(document => ({uid: document.id}))
}

export const valifyUser = async (uid) => {
  await userdb.doc(uid).update({
    valid: true,
  })
}
