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

import firebase from 'firebase'
import db from '../firebaseConfig'

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
        .then(() => {
          let person = firebase.auth().currentUser;
          person.updateProfile({
            displayName: this.userName
          })          
          
          db.collection("users").add({ 
              name: this.userName,//UserTable.vueでユーザ一覧を表示するために保存しておく
              money: 500,//銭は、一律で500ポイントを各ユーザに付与
          })
          .then(() => {
            alert("登録完了");
            this.$router.push('/');
          })
          .catch(error => {
            alert(error.message)
          })          
        })
        .catch(error => {
          alert(error.message)
        })
    },
  }
}
</script>