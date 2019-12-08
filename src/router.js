/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
/*eslint no-irregular-whitespace: ["error", { "skipComments": true }]*/
/*eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"]*/

import Vue from 'vue'
import Router from 'vue-router'
import UserTable from './components/UserTable.vue'
import Signup from './components/Signup.vue'
import Signin from './components/Signin.vue'
import firebase from 'firebase'
import store from './store'

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
      path: '/',
      name: 'UserTable',
      component: UserTable,
      meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {    
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        store.dispatch('nameSetAction', firebase.auth().currentUser.displayName);
        next()
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next() 
  }
})

export default router