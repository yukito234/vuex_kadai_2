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
      let targetUserMoney = 0;//送り先ユーザの残高
      const that = this;

      const amount = Number( prompt(`あなたの残高：${this.loginUserMoney}\n送金額を入力してください`) );

      //送り先ユーザのドキュメントIDと残高を取得
      async function getTargetInfo(){
        return db.collection("users").get()
            .then( querySnapshot => {
                for( let i = 0; i < querySnapshot.docs.length; i++ ){         
                  if( querySnapshot.docs[i].data().name === name ){
                    targetUserID = querySnapshot.docs[i].id;
                    targetUserMoney = querySnapshot.docs[i].data().money;
                    return ;
                  }
                }                
            })
            .catch( error => {
              alert(error.message);
            });
      }
      //ログインユーザと送り先ユーザの取引後の残高を計算
      async function culcMoney(){
        that.loginUserMoney = that.loginUserMoney - amount;        
        targetUserMoney = targetUserMoney + amount;        
        
      }
      //トランザクション処理により、ログインユーザと送り先ユーザのfirestore残高データを更新
      function doTransaction(){
        const loginUserRef = db.collection("users").doc(that.loginUserID);
        const targetUserRef = db.collection("users").doc(targetUserID);        

        db.runTransaction( async transaction => {
          const loginUserTransaction = transaction.update(loginUserRef, { money: that.loginUserMoney });          
          const targetUserTransaction =transaction.update(targetUserRef, { money: targetUserMoney });          
        }).then(function() {
          alert("送金は正常に完了しました");          
        }).catch(function(err) {
          alert("エラーが発生し、送金に失敗しました");            
          console.error(err);
        });
      }
      //送金の一連の処理をまとめた関数
      async function ExecuteMoneyTransfer(){
        await getTargetInfo();
        await culcMoney();
        await doTransaction();        
      }
      //送金の実行
      ExecuteMoneyTransfer();
    },
  }
}
</script>