<template>
	<section class="body">
		<div class="menu-list">
			<ul>
				<li>
					<a href="javascript:;" class="stores-overlay" @click="pageRedir(1)">
						门店
					</a>
				</li>
				<li v-if="!NickName">
					<a href="javascript:;" class="account-overlay" @click="pageRedir(5)">
						星享俱乐部
					</a>
				</li>
				<li v-if="NickName">
					<a href="javascript:;" class="account-overlay" @click="pageRedir(2)">
						我的账户
					</a>
				</li>
				<li>
					<a href="javascript:;" class="menu-overlay" @click="pageRedir(3)">
						菜单
					</a>
				</li>
				<li><hr /></li>
				<li>
					<a href="javascript:;" class="apps-overlay">
						星巴克移动应用
					</a>
				</li>
				<li>
					<a href="javascript:;" class="svc-overlay">
						星礼卡
					</a>
				</li>
				<li>
					<a href="javascript:;" class="starbucks_reserve-overlay">
						星巴克臻选™
					</a>
				</li>
				<li>
					<a href="javascript:;" class="starbucks_delivery-overlay">
						专星送™
					</a>
				</li>
				<li>
					<a href="javascript:;" class="coffeehouse-overlay">
						咖啡星讲堂
					</a>
				</li>
				<li>
					<a href="javascript:;" class="roastery-overlay">
						上海烘焙工坊
					</a>
				</li>
				<li>
					<a href="javascript:;" class="about-overlay">
						关于星巴克
					</a>
				</li>
				<li>
					<a href="javascript:;" class="help-overlay">
						帮助中心
					</a>
				</li>
				<li><hr /></li>
			</ul>
			<footer class="account-entry">
				<a href="javascript:;" class="sign-in button" @click="pageRedir(2)" v-if="!NickName">
					<span>登录</span>
				</a>
				<a href="javascript:;" class="register button" @click="pageRedir(4)" v-if="!NickName">
					<span>注册</span>
				</a>
				<a href="javascript:;" class="logout" @click="logout" v-if="NickName">
					<img src="@/assets/icons/icon-account.svg" alt="">
					<span>登出</span>
				</a>
			</footer>
		</div>
	</section>
</template>

<script>
	import axios from 'axios'
	import TokenTools from '@/utils/tokenTools'
	import CookieTools from '@/utils/cookieTools'
	import PageviewTools from '@/utils/pageviewTools'

	export default {
		data(){
			return {

			}
		},
		computed: {
			NickName(){
				return this.$store.state.NickName;
			}
		},
		methods: {
			pageRedir(item){
				this.$store.commit('pageRedir', item);
			},
			logout(){
				let ReqToken = TokenTools.TokenSetting('sbux_token_lo');
				if(ReqToken){
					axios.post("users/logout",{
						ReqToken:ReqToken
					}).then((res)=>{
						let data = res.data;
						if(data.status == '0'){
							this.$store.commit('updateUserInfo', '');
							this.$store.commit('pageRedir', 0);
						}else{
							console.log('登出失败');
						}
						CookieTools.DelCookie('sbux_token_lo');
					})
				}

				let storage = window.sessionStorage || null;
				if(storage) {
					axios.post('/users/trackLogout', {
						visitorID: storage.getItem('VisitorID'),
						LogoutTime: PageviewTools.GetTime()
					})
				}	
			}
		}
	}

</script>
