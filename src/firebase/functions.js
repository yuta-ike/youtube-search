import { functions } from './core/index.js'

export const sendMail = functions.httpsCallable('sendMail')
