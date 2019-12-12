<template>
  <div>    
    <span>{{loginUserName}}さんようこそ！！</span>
    <h2>ユーザ一覧</h2>    
    <table>
      <thead>
        <tr>
          <th>ユーザ名</th>          
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>        
        <tr v-for="element in allUsers" v-bind:key="element.name">
          <td>{{ element.name }}</td>          
          <td>
            <button>walletを見る</button>            
          </td>
          <td>
            <button>送る</button>
          </td>
        </tr>
      </tbody>
    </table>    
    <button v-on:click="signOut">ログアウト</button>
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
      allUsers:[],//ログインユーザ以外の全ユーザデータを保持
    }
  },
  created:function(){
    db.collection("users").get()
      .then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          const data = doc.data();
          if( data.name !== this.loginUserName){
            this.allUsers.push(data);
          }
        });
      });

  },
  computed:{
    loginUserName(){
      return this.$store.state.currentUserName;
    }
  },
  methods: {
    signOut() {
      this.$store.commit('nameInit');
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    },
  }
}
</script>