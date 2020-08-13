<template>
	<div>
		<article class="wrapper">
				<nav class="nav">
					<nav-container v-on:showMenuOverlay="showMenuExec" v-show="!show_menu_bol">
						<span slot="navbody">
							<section class="navbody-menu body">
								<div class="menubtn account">
									<div class="back">
										<a href="javascript:;" @click="pageRedir(8)">
											<img src="@/assets/icons/icon-chevron-left.svg">
											<span>管理我的账户</span>
										</a>
									</div>
									<h2 class="navTitle-menuList">管理星礼卡</h2>
								</div>
							</section>
						</span>
					</nav-container>
					<nav-overlay v-on:closeMenuOverlay="closeMenuExec" v-show="show_menu_bol">
					</nav-overlay>
					<nav-mobile v-on:showMenuOverlay="showMenuExec"></nav-mobile>
				</nav>
				<section class="content profile-svc" v-if="lgMedia || !show_menu_bol" style="min-height: 100vh;background: #F7F7F7;">
					<div class="loading-svg center" v-if="loading" style="margin:-24px 0;padding: 24px 0;background: #F7F7F7;">
						<img src="@/assets/loading-svg/loading-bubbles.svg"/>
					</div>
					<div class="wrapper" v-show="!loading">
						<ul class="clearfix">
							<li v-for="(item, index) in SvcCard">
								<div class="card-item">
									<header>
										<h2>¥ {{item.Balance}}</h2>
										<div class="btn-group">
											<button class="btn-l">
												<img src="@/assets/icons/icon-history-green.svg">
												<span>消费记录</span>
											</button>
											<button class="btn-r">
												<img src="@/assets/icons/icon-settings-green.svg">
												<span>管理</span>
											</button>
										</div>
									</header>
									<div class="body">
										<div class="preview">
											<img :src="'/static/images/svc-card/'+item.CardImage">
										</div>
										<div class="meta">
											<span class="card_id">{{item.CardID}}</span>
											<span>(以上余额截止至今天)</span>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</section>
		</article>
	</div>
</template>

<script>

	import '@/assets/css/bootstrap.min.css'
	import '@/assets/css/init.css'
	import '@/assets/css/styles.css'
	import '@/assets/css/menu.css'
	import NavContainer from '@/components/navContainer'
	import NavOverlay from '@/components/NavOverlay'
	import NavMobile from '@/components/navMobile'
	import TokenTools from '@/utils/tokenTools'
	import CookieTools from '@/utils/cookieTools'
	import axios from 'axios'

	export default {
		name: 'menuBeverages',
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
				loading: false,
				SvcCard: '',
				CardNum: ''
			}
		},
		mounted(){
			const _self = this;
			window.matchMedia('(min-width: 1025px)').addListener(()=>{
				_self.lgMedia = window.matchMedia('(min-width: 1025px)').matches;
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
			pageRedir(item){
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

							//如果当前为登录状态，则进一步获取用户信息
							this.getAccountInfo();
						}else{
							this.$store.commit('updateUserInfo', '');
						}
						CookieTools.DelCookie('sbux_token_cl');
					})
				}
			},
			getAccountInfo(){
				this.loading = true;

				let ReqToken = TokenTools.TokenSetting('sbux_token_gai');
				
				if(ReqToken){
					axios.post("users/accountInfo",{
						ReqToken: ReqToken
					}).then((res)=>{
						let data = res.data;
						if(data.status == '0'){
							let res = data.result;
							/* ***管理星礼卡部分*** */
							this.SvcCard = res.SvcCard;
							this.CardNum = res.SvcCard.length;
							CookieTools.DelCookie('sbux_token_gai');
							this.loading = false;
						}
					})
				}
			},
			trackingVisitor() {
				let storage = window.sessionStorage || null;
				if(storage) {
					let VisitorID = storage.getItem('VisitorID'),
						page = '我的账户-管理星礼卡';
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
