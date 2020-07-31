import Vue from 'vue';
import Vuex from 'vuex';
import Router from '@/router'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		/* 页面路由切换 */
		path: ['/', '/stores', '/account', '/menu', 
			   '/account/register', '/account/starbucks-rewards', '/account/activity', '/account/rewards', '/account/profile',
			   '/menu/beverages', '/menu/food', '/menu/coffee', '/menu/merchandise', '/account/profile/svc'
			  ],
		
		/* Mobile Nav按钮效果与路由切换 */
		actives: [true, false, false, false, false],

		/* 登录后用户信息展示*/
		UserID: '',
		NickName: ''
	},
	mutations: {
		pageRedir(state, item){
			let routerPath = state.path[item];
			if(!routerPath){
				console.log('Router Path does not exist !');
			}
			if(item == '3' || item == '4'){
				state.AccountView = '';
			}
			Router.push({path:routerPath});
		},
		mobileNavAct(state, tag){
			state.actives = state.actives.map(()=>{
				return false;
			});
			state.actives[tag] = true;
		},
		updateUserInfo(state, NickName){
			state.NickName = NickName;
		}
		//通过VueX控制登录前后的页面跳转，麻烦
		// updateAccountView(state, login){
		// 	if(login){
		// 		state.AccountView = 'IndexLogin';
		// 		return;
		// 	}
		// 	state.AccountView = 'Index';
		// }
	},
});

export default store;
