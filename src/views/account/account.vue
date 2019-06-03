<template>
		<router-view />
</template>

<!--
<router-view v-bind:is="view" />
<script>
	import Index from './index'
	import AccountRegister from './register'
	import AccountRewards from './rewards'
	import IndexLogin from './indexLogin'
	import axios from 'axios'

	export default {
		data(){
			return {
				
			}
		},
		computed: {
			view(){
				return this.$store.state.AccountView;
			}
		},
		mounted(){
			this.checkLogin();
		},
		components: {
			Index: Index,
			IndexLogin: IndexLogin
		},
		methods: {
			checkLogin(){
				axios.post("users/checkLogin").then((res)=>{
					let data = res.data;
					if(data.status == '0'){
						let res = data.result;
						this.$store.commit('updateUserInfo', res.NickName);
						this.$store.commit('updateAccountView', true);
					}
				})
			}
		}
	}
</script> 
-->