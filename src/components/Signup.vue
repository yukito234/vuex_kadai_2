<template>
  <div>
    <h2>新規登録画面</h2>
    ユーザ名<input type="text" v-model="userName">
    <br>
    メールアドレス<input type="text" v-model="email">
    <br>
    パスワード<input type="password" v-model="password">
    <br>
    <button v-on:click="signUp">新規登録</button>
    <br>
    <router-link to="/signin">ログインはこちらから</router-link>
    
  </div>
</template>

<script>
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
/*eslint no-irregular-whitespace: ["error", { "skipComments": true }]*/
/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/

import firebase from '../firebaseConfig'
let db = firebase.firestore()

export default {  
  name: 'Signup',
  data () {
    return {
      userName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signUp(){     
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)      
        .then((user) => {
          console.warn("user");
          console.warn(user);//

          let person = firebase.auth().currentUser;

          person.updateProfile({
            displayName: this.userName
          })
          .then(() => {            
            console.warn("firebase.auth().currentUser.displayName");
            console.warn(firebase.auth().currentUser.displayName);
          })

          db.collection("users").add({
              name: this.userName,
              emailAddress: this.email,
          })
          .then(function() {
              console.warn("success");
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
          });
        })
        .catch(error => {
          alert(error.message)
        })
    },
  }
}
</script>