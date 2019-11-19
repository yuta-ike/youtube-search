const functions = require('firebase-functions');

const nodemailer = require("nodemailer");

const emailAddress = functions.config().gmail.email;
const password = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailAddress,
    pass: password,
  }
})

// exports.sendMail = functions.https.onCall((data, _) => {
//   let email = {
//     from: emailAddress,
//     to: data.destination,
//     subject: data.subject,
//     text: data.content
//   }
//   mailTransport.sendMail(email, (err, _) => {
//     if (err) {
//       console.log(err)
//       return false
//     }
//     console.log('success')
//     return true
//   })
// })

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
