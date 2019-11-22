<template>
  <div>
    <span>{{name}}さんようこそ！！</span>
    <h2>ユーザ一覧</h2>
    <button v-on:click="signOut">ログアウト</button>
        
  </div>
</template>

<script>
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
/*eslint no-irregular-whitespace: ["error", { "skipComments": true }]*/
/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/

import firebase from '../firebaseConfig'

export default {
  name: 'UserTable',
  data () {
    return {      
      name: firebase.auth().currentUser.displayName      
    }
  },
  methods: {
    signOut() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
}
</script>