<template>
	<div>
		<article class="wrapper">
			<nav class="nav">
				<nav-container v-on:showMenuOverlay="showMenuExec" v-show="!show_menu_bol">
					<span slot="navbody">
						<section class="body" v-if="!NickName">
							<div class="account">
								<div class="greetings">
									<span>心情惬意，来杯咖啡吧 ☕</span>
								</div>
								<div class="account-entry">
									<a href="javascript:;" class="sign-in button" @click="pageRedir(2)">
										<span>登录</span>
									</a>
									<a href="javascript:;" class="register button" @click="pageRedir(4)">
										<span>注册</span>
									</a>
								</div>
							</div>
						</section>
						<section class="body" v-if="NickName">
							<div class="account">
								<a href="javascript:;" class="logo logo-onlogin" @click="pageRedir(0)" v-if="mbMedia">
									<img src="@/assets/images/logo.svg" alt="星巴克">
								</a>
								<div class="greetings onlogin" :class="{'withlogo': mbMedia}">
									<span>{{loginGreetings[random]}}</span>
								</div>
								<div class="account-info clearfix">
									<!-- 此处需使用v-show,使用v-if会导致进度条无法渲染 -->
									<div class="user-stars clearfix" @click="pageRedir(2)" v-show="!loading">
										<div class="star-level">
											<span>
												<strong>{{StarsNum}}</strong>/{{StarsOfNextLevNeed}}
											</span>
											<div class="gauge">
												<div class="gauge-fill"></div>
											</div>
										</div>
										<div class="star-icon">
											<img src="@/assets/icons/icon-star-white.svg" v-if="StarLev == 'White'">
											<img src="@/assets/icons/icon-star-green.svg" v-if="StarLev == 'Green'">
											<img src="@/assets/icons/icon-star-gold.svg" v-if="StarLev == 'Gold'">
										</div>
									</div>
									<div class="user-rewards" @click="pageRedir(7)" v-show="!loading">
										<img src="@/assets/icons/icon-gift.svg"><span>{{MyRewardsNum}}</span>
									</div>
								</div>
								<div class="loading-svg center" v-if="loading">
									<img src="@/assets/loading-svg/loading-bubbles.svg"/>
								</div>
							</div>
						</section>
					</span>
				</nav-container>
				<nav-overlay v-on:closeMenuOverlay="closeMenuExec" v-show="show_menu_bol">
				</nav-overlay>
				<nav-mobile v-on:showMenuOverlay="showMenuExec"></nav-mobile>
			</nav>
			<section class="content" v-if="lgMedia || !show_menu_bol">
				<div class="tag-ad">广告</div>
				<ad-slider></ad-slider>
				<promotion></promotion>
				<program></program>
				<tmall></tmall>
				<coffeehouse></coffeehouse>
			</section>
		</article>
	</div>
</template>

<script>

	import './../assets/css/bootstrap.min.css'
	import './../assets/css/swiper.min.css'
	import './../assets/css/init.css'
	import './../assets/css/styles.css'
	import NavContainer from '@/components/navContainer'
	import NavOverlay from '@/components/NavOverlay'
	import NavMobile from '@/components/navMobile'
	import AdSlider from '@/components/adSlider'
	import Promotion from '@/components/promotion'
	import Program from '@/components/program'
	import Tmall from '@/components/tmall'
	import Coffeehouse from '@/components/coffeehouse'
	import TokenTools from '@/utils/tokenTools'
	import CookieTools from '@/utils/cookieTools'
	import PageviewTools from '@/utils/pageviewTools'
	import axios from 'axios'
	import AMap from 'AMap'

	export default {
		name: 'index',
		metaInfo: {
			title: '星巴克 | 用每一杯咖啡传递星巴克独特的咖啡体验',
			meta: [
				{
					name: 'keywords',
					content: '星巴克, 咖啡'
				},
				{
					name: 'description',
					content: '欢迎访问星巴克中国官网。'
				}
			]
		},
		data(){
			return {
				show_menu_bol: false,
				lgMedia: window.matchMedia('(min-width: 1025px)').matches,
				mbMedia: window.matchMedia('(max-width: 640px)').matches,
				loginGreetings: [
					'如果生活给了你柠檬🍋，不妨换杯咖啡试试',
					'人生得意须尽欢，莫使☕️空对月',
					'今天的心情是茶🍵还是咖啡☕呢?',
					'咖啡带给你好心情 ❤️',
					'咖啡会让你脑洞大开哟 ☕'
				],
				random: Math.floor(Math.random()*5),
				StarLev: '',
				StarsNum: '',
				StarsOfNextLevNeed: '',
				MyRewardsNum: '',
				loading: false
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

			this.pageview();
		},
		components: {
			NavContainer: NavContainer,
			NavOverlay: NavOverlay,
			NavMobile: NavMobile,
			AdSlider: AdSlider,
			Promotion: Promotion,
			Program: Program,
			Tmall: Tmall,
			Coffeehouse: Coffeehouse
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
							this.accountInfoDisp();

							let storage = window.sessionStorage || null;
							if(storage && storage.getItem('isNewPV') !== 'false') {
								axios.post('/users/trackLogin', {
									visitorID: storage.getItem('VisitorID'),
									msg: '自动登录'
								})
							}
						}else{
							this.$store.commit('updateUserInfo', '');
						}
						CookieTools.DelCookie('sbux_token_cl');
					})
				}
			},
			accountInfoDisp(){
				this.loading = true;

				let ReqToken = TokenTools.TokenSetting('sbux_token_gai');
				
				if(ReqToken){
					axios.post("users/accountInfo",{
						ReqToken: ReqToken
					}).then((res)=>{
						let data = res.data;
						if(data.status == '0'){
							let res = data.result;
							/*
								正常来讲，此处还应该先进行星级，礼品券的过期时间及是否可用等信息进行校验；
								此外如果width值达到100%也应进行相关星级礼品券等信息的修改工作；
								最后进行前端渲染。
							*/
							this.StarLev = res.MemberShip.StarLevel;
							this.StarsNum = res.MemberShip.StarsNumber;
							this.StarsOfNextLevNeed = res.MemberShip.StarsOfNextLevNeed;
							
							let MyRewards = res.MyRewards,
								AvlRewd = [];

							for(let i = 0; i < MyRewards.length; i++){
								if(MyRewards[i].State === 'AVL'){
									AvlRewd.push(MyRewards[i]);
								}
							}

							this.MyRewardsNum = AvlRewd.length;


							let width = (this.StarsNum/this.StarsOfNextLevNeed)*100 + '%';
							let bgColor = '';

							switch(this.StarLev){
								case 'White':
									bgColor = '#4F4F4F';
									break;
								case 'Green':
									bgColor = '#00A862';
									break;
								case 'Gold':
									bgColor = '#C3A75C';
									break;
							}

							$('.gauge-fill').css({
								'width': width,
								'background': bgColor
							});

							CookieTools.DelCookie('sbux_token_gai');

							this.loading = false;
						}
					})
				}
			},
			pageview() {
				let storage = window.sessionStorage || null,
					VisitorID = 'SessionStorageisNotSupported';
				
				if(storage) {
					if(storage.getItem('isNewPV') === 'false') return;
					VisitorID = PageviewTools.GetVisitorID();
					storage.setItem('VisitorID', VisitorID);
					storage.setItem('isNewPV', true);
				}

				// 获取访客信息
				let screen = PageviewTools.GetScreenInfo(window),
					device = PageviewTools.GetBrowser(),
					page = '主页',
					ReqToken = TokenTools.TokenSetting('sbux_token_pv');

				// 获取访客位置
				AMap.plugin([
					'AMap.Geolocation',
					'AMap.Geocoder'
				], ()=>{
					let geolocation = new AMap.Geolocation({
						enableHighAccuracy: true,
						timeout: 3000
					});
					let geocoder = new AMap.Geocoder();

					geolocation.getCurrentPosition((status, result)=>{
						// 首先获取当前地理位置，如果失败则获取当前城市信息
						if(status == 'complete'){
							let position = result.position,
								lnglat = [position.lng, position.lat];
							geocoder.getAddress(lnglat, (status, result)=>{
								let location = PageviewTools.ReturnAddress(status, result);
								// 所有访客数据准备完毕，上传至服务器
								if(ReqToken){
									PageviewTools.UploadData({
										axios: axios,
										router: "users/pageview",
										params: {
											visitorID: VisitorID,
											location: location,
											screen: screen,
											device: device,
											page: page,
											ReqToken: ReqToken
										},
										token: "sbux_token_pv",
										storage: storage,
										key: 'isNewPV'
									})
								}
							});
						}else{
							// 获取当前城市信息
							geolocation.getCityInfo((status, result)=>{
								let lnglat = result.center;
								geocoder.getAddress(lnglat, (status, result)=>{
									let location = PageviewTools.ReturnAddress(status, result);
									// 所有访客数据准备完毕，上传至服务器
									if(ReqToken){
										PageviewTools.UploadData({
											axios: axios,
											router: "users/pageview",
											params: {
												visitorID: VisitorID,
												location: location,
												screen: screen,
												device: device,
												page: page,
												ReqToken: ReqToken
											},
											token: "sbux_token_pv",
											storage: storage,
											key: 'isNewPV'
										})
									}
								});
							});
						}
					});
				});
			}
		}
	}

</script>
