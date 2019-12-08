<template>
  <div>    
    <span>{{loginUserName}}さんようこそ！！</span>
  </div>
</template>

<script>
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
/*eslint no-irregular-whitespace: ["error", { "skipComments": true }]*/
/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/

import firebase from 'firebase'// eslint-disable-line no-unused-vars
import db from '../firebaseConfig'// eslint-disable-line no-unused-vars
import store from '../store'

export default {
  name: 'UserTable',
  data () {
    return {
      
    }
  },
  computed:{
    loginUserName(){
      return this.$store.state.currentUserName;
    }
  },
}
</script>