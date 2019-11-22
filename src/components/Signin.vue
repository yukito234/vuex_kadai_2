<template>
  <div>
    <h2>ログイン画面</h2>
    メールアドレス<input type="text" v-model="email">    
    <br>
    パスワード<input type="password" v-model="password">
    <br>
    <button v-on:click="signIn">ログイン</button>
    <br>
    <router-link to="/signup">新規登録はこちら</router-link>
    
  </div>
</template>

<script>
import firebase from '../firebaseConfig'
export default {
  name: 'Signin',
  data () {
    return {     
      email: '',
      password: ''
    }
  },
  methods: {
    signIn() {      
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
          alert('Success!')
          this.$router.push('/')
        },
        err => {
          alert(err.message)
        }
      )
    }
  }
}
</script>