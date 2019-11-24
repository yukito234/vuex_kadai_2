import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCrMbAl6UW111qH3sUjd0Ve2KqGOCPIApQ",
  authDomain: "vuex-kadai-2.firebaseapp.com",
  databaseURL: "https://vuex-kadai-2.firebaseio.com",
  projectId: "vuex-kadai-2",
  storageBucket: "vuex-kadai-2.appspot.com",
  messagingSenderId: "649761251146",
  appId: "1:649761251146:web:7a25c8e94f1fd854af2bb3"
};
firebase.initializeApp(config);

export default firebase;