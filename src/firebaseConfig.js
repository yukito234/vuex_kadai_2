/*eslint no-irregular-whitespace: ["error", { "skipComments": true }]*/
import firebase from 'firebase'

const config = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  databaseURL: process.env.VUE_APP_databaseURL,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId
};

firebase.initializeApp(config);
const db = firebase.firestore()// eslint-disable-line no-unused-vars
export default db