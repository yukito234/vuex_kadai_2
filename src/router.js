/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
/*eslint no-irregular-whitespace: ["error", { "skipComments": true }]*/
/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/

import Vue from 'vue'
import Router from 'vue-router'
import Signup from './components/Signup.vue'
import Signin from './components/Signin.vue'
import firebase from 'firebase'// eslint-disable-line no-unused-vars

Vue.use(Router)

const router = new Router({
  mode:'history',
  base:process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: 'signin'
    },    
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})

export default router