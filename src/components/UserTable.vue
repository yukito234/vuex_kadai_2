<template>
  <div>    
    <span>{{loginUserName}}さん、ようこそ！！</span>
    <span>残高：{{ loginUserMoney }}</span>
    <button v-on:click="signOut">ログアウト</button>
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
            <button v-on:click="walletShow(element.name)">walletを見る</button>
          </td>
          <td>
            <button v-on:click="moneyTransfer(element.name)">送る</button>
          </td>
        </tr>
      </tbody>
    </table>    
    
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
      walletValue:0,//各ユーザの残高を保持
      loginUserID: "",//ログインユーザのfirestoreのドキュメントID
      loginUserMoney: 0,//ログインユーザの残高
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
        //ログインユーザのドキュメントIDと残高を取得（送金時に必要となる）
        for(let i =0; i<querySnapshot.docs.length; i++){           
          if(querySnapshot.docs[i].data().name === store.state.currentUserName){
            this.loginUserID = querySnapshot.docs[i].id;
            this.loginUserMoney = querySnapshot.docs[i].data().money;
          }
        }
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
    walletShow(name){      
      let targetName ="";//ダイアログにユーザ名を表示させるため、一時的にユーザ名を保持
      //DBからユーザ名と残高を取得　
      db.collection("users").get()
        .then((querySnapshot)=>{
          for(let i =0; i<querySnapshot.docs.length; i++){           
             if(querySnapshot.docs[i].data().name === name){
               this.walletValue = querySnapshot.docs[i].data().money;
               targetName = querySnapshot.docs[i].data().name;
             }
          }
          alert(`${targetName}さんの残高${this.walletValue}`);
        });
    },
    moneyTransfer(name){     
      let targetUserID = "";//送り先ユーザのドキュメントID
      let targetUserMoney =0;//送り先ユーザの残高
      const amount = Number( prompt(`あなたの残高：${this.loginUserMoney}\n送金額を入力してください`) );
      //送り先ユーザのドキュメントIDと残高を取得
      db.collection("users").get()
        .then((querySnapshot)=>{
          for(let i =0; i<querySnapshot.docs.length; i++){           
            if(querySnapshot.docs[i].data().name === name){
              targetUserID = querySnapshot.docs[i].id;
              targetUserMoney = querySnapshot.docs[i].data().money;
            }
          }
          //ログインユーザと送り先ユーザの取引後の残高を計算
          this.loginUserMoney = this.loginUserMoney - amount;
          targetUserMoney = targetUserMoney + amount;
          
          //ログインユーザのfirestoreの残高データを更新
          db.collection("users").doc(this.loginUserID)
            .update({
              money:this.loginUserMoney,
            })
            .then(function() {
              //送り先ユーザのfirestoreの残高データを更新
              db.collection("users").doc(targetUserID)
                .update({
                  money:targetUserMoney,
                })
                .then(function() {
                })
                .catch(function(error) {                
                  console.error("Error updating document: ", error);
                });
            })
            .catch(function(error) {            
              console.error("Error updating document: ", error);
            });
        });
    },
  }
}
</script>