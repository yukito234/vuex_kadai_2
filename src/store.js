/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{		
		currentUserName : "",
	},	
	actions:{		
		nameSetAction(context, name){
			context.commit('nameSet', name);
		}
	},
	mutations:{		
		nameSet(state, name){
			state.currentUserName = name;			
		},
		nameInit(state){
			state.currentUserName = "";
		},
	},	
})

export default store