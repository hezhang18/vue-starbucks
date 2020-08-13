<template>
	<div>
		<article class="wrapper">
			<nav class="nav">
				<nav-container v-on:showMenuOverlay="showMenuExec" v-show="!show_menu_bol">
					<span slot="navbody">
						<section class="navbody-menu body">
							<div class="accountbtn menubtn account">
								<h2>
									<span class="welcome">{{hello}}</span>
									<span class="nickname">{{NickName}}</span>
									&nbsp;☕
								</h2>
								<ul>
									<li @click="pageRedir(2, 'account')">
										<a href="javascript:;" :class="{'active-menu':curActive == 'account'}">
											账户一览
										</a>
									</li>
									<li @click="pageRedir(6, 'activity')">
										<a href="javascript:;" :class="{'active-menu':curActive == 'activity'}">
											消费记录
										</a>
									</li>
									<li @click="pageRedir(7, 'rewards')">
										<a href="javascript:;" :class="{'active-menu':curActive == 'rewards'}">
											星享好礼
										</a>
									</li>
									<li @click="pageRedir(8, 'profile')">
										<a href="javascript:;" :class="{'active-menu':curActive == 'profile'}">
											管理我的账户
										</a>
									</li>
									<li @click="pageRedir(5, 'starbucks-rewards')">
										<a href="javascript:;" :class="{'active-menu':curActive == 'starbucks-rewards'}">
											关于星享俱乐部
										</a>
									</li>
								</ul>
							</div>
						</section>
					</span>
				</nav-container>
				<nav-overlay v-on:closeMenuOverlay="closeMenuExec" v-show="show_menu_bol">
				</nav-overlay>
				<nav-mobile v-on:showMenuOverlay="showMenuExec"></nav-mobile>
			</nav>
			<article class="content profile" v-if="lgMedia || !show_menu_bol" style="min-height: 100vh;background: #F7F7F7;">
				<div class="wrapper">
					<ul>
						<li>
							<div class="text">
								<span class="title">管理星享卡</span>
								<span class="desc">关联、删除、报失你的星享卡</span>
							</div>
							<img class="icon" src="@/assets/icons/ic_msr.svg">
							<img class="icon arrow-grey" src="@/assets/icons/icon-right-arrow-gray.svg" v-if="mbMedia">
						</li>
						<li @click="pageRedir(13)">
							<div class="text">
								<span class="title">管理星礼卡</span>
								<span class="desc">绑定、删除、报失你的星礼卡，查看消费记录</span>
							</div>
							<img class="icon" src="@/assets/icons/ic_svc.svg">
							<img class="icon arrow-grey" src="@/assets/icons/icon-right-arrow-gray.svg" v-if="mbMedia">
						</li>
						<li>
							<div class="text">
								<span class="title">个人资料</span>
								<span class="desc">修改个人资料，查看账户周年日</span>
							</div>
							<img class="icon" src="@/assets/icons/ic_profile.svg">
							<img class="icon arrow-grey" src="@/assets/icons/icon-right-arrow-gray.svg" v-if="mbMedia">
						</li>
						<li>
							<div class="text">
								<span class="title">账户与安全</span>
								<span class="desc">管理用户名，邮箱地址，手机号和密码</span>
							</div>
							<img class="icon" src="@/assets/icons/ic_security.svg">
							<img class="icon arrow-grey" src="@/assets/icons/icon-right-arrow-gray.svg" v-if="mbMedia">
						</li>
						<li>
							<div class="text">
								<span class="title">邮寄地址簿</span>
								<span class="desc">添加、修改、删除地址</span>
							</div>
							<img class="icon" src="@/assets/icons/ic_address.svg">
							<img class="icon arrow-grey" src="@/assets/icons/icon-right-arrow-gray.svg" v-if="mbMedia">
						</li>
						<li>
							<div class="text">
								<span class="title">设置</span>
								<span class="desc">更改通信语言和订阅方式，登出设备，注销星享卡账户</span>
							</div>
							<img class="icon" src="@/assets/icons/ic_setting.svg">
							<img class="icon arrow-grey" src="@/assets/icons/icon-right-arrow-gray.svg" v-if="mbMedia">
						</li>
					</ul>
				</div>
			</article>
		</article>
	</div>
</template>

<script>

	import '@/assets/css/bootstrap.min.css'
	import '@/assets/css/swiper.min.css'
	import '@/assets/css/init.css'
	import '@/assets/css/styles.css'
	import '@/assets/css/account.css'
	import '@/assets/css/userinfo.css'
	import NavContainer from '@/components/navContainer'
	import NavOverlay from '@/components/NavOverlay'
	import NavMobile from '@/components/navMobile'
	import TokenTools from '@/utils/tokenTools'
	import CookieTools from '@/utils/cookieTools'
	import axios from 'axios'

	export default {
		name: 'account',
		metaInfo: {
			title: '星享俱乐部',
			titleTemplate: '%s | 星巴克',
			meta: [
				{
					name: 'keywords',
					content: ''
				},
				{
					name: 'description',
					content: '星享俱乐部'
				}
			]
		},
		data(){
			return {
				show_menu_bol: false,
				lgMedia: window.matchMedia('(min-width: 1025px)').matches,
				mbMedia: window.matchMedia('(max-width: 640px)').matches,
				curActive: 'profile',
				welcome: [
					'早上好!',
					'上午好!',
					'中午好!',
					'下午好!',
					'晚上好!'
				],
				hello: '您好!'
			}
		},
		computed: {
			NickName(){
				return this.$store.state.NickName;
			}
		},
		mounted(){
			const _self = this;
			window.matchMedia('(min-width: 1025px)').addListener(()=>{
				_self.lgMedia = window.matchMedia('(min-width: 1025px)').matches;
			});
			window.matchMedia('(max-width: 640px)').addListener(()=>{
				_self.mbMedia = window.matchMedia('(max-width: 640px)').matches;
			});
			this.checkLogin();
			this.trackingVisitor();
		},
		components: {
			NavContainer: NavContainer,
			NavOverlay: NavOverlay,
			NavMobile: NavMobile
		},
		methods: {
			showMenuExec(){
				this.show_menu_bol = true;
			},
			closeMenuExec(){
				this.show_menu_bol = false;
			},
			pageRedir(item, curName){
				if(curName){
					this.curActive = curName;
				}
				this.$store.commit('pageRedir', item);
			},
			checkLogin(){
				let ReqToken = TokenTools.TokenSetting('sbux_token_cl');
				
				if(ReqToken){
					axios.post("users/checkLogin",{
						ReqToken: ReqToken
					}).then((res)=>{
						let data = res.data;
						if(data.status == '0'){
							let res = data.result;
							this.$store.commit('updateUserInfo', res.NickName);
							this.getHelloWord();
						}else{
							this.$store.commit('updateUserInfo', '');
						}
						CookieTools.DelCookie('sbux_token_cl');
					})
				}
			},
			getHelloWord(){
				let time = new Date(),
					hours = time.getHours(),
					index = '';

				if(hours >= 0 && hours < 8) {
					index = 0;
				}else if(hours >= 8 && hours < 12) {
					index = 1;
				}else if(hours >= 12 && hours < 14) {
					index = 2;
				}else if(hours >= 14 && hours < 20) {
					index = 3;
				}else {
					index = 4;
				}

				this.hello = this.welcome[index];
			},
			trackingVisitor() {
				let storage = window.sessionStorage || null;
				if(storage) {
					let VisitorID = storage.getItem('VisitorID'),
						page = '我的账户-管理我的账户';
					if(!VisitorID) return;
					axios.post('users/tracking',{
						visitorID: VisitorID,
						page: page
					})
				}
				
			}
		}
	}

</script>
