<template>
	<div>
		<article class="wrapper">
			<nav class="nav">
				<nav-container v-on:showMenuOverlay="showMenuExec" v-show="!show_menu_bol">
					<span slot="navbody">
						<section class="navbody-menu body">
							<div class="accountbtn menubtn account">
								<h2>登录或创建一个新帐户 🌟 </h2>
								<ul>
									<li @click="pageRedir(2, 'login')">
										<a href="javascript:;" :class="{'active-menu':curActive == 'login'}">
											登录
										</a>
									</li>
									<li @click="pageRedir(4, 'register')">
										<a href="javascript:;" :class="{'active-menu':curActive == 'register'}">
											注册
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
			<article class="content" v-if="lgMedia || !show_menu_bol">
				<section class="account-welcome">
					<a href="javascript:;">
						<img src="/static/images/account-join/header_cn.jpg" alt="">
					</a>
				</section>
				<section class="account-login-actions">
					<div class="form-login qrcode-login">
						<div @click="toggleLoginAct()">
							<div class="login-switcher switch-to-code" v-if="showFormLogin">
								<p>
									<span>扫码登录</span>
								</p>
							</div>
							<div class="login-switcher switch-to-form" v-if="!showFormLogin">
								<p>
									<span>账号登录</span>
								</p>
							</div>
						</div>
						<component v-bind:is="view"></component>
					</div>
				</section>
				<section class="account-join">
					<div class="wrapper">
						<h2>
							<span>加入星享俱乐部</span>
						</h2>
						<p>
							<span>只需几分钟，便可成功注册星享俱乐部帐户，成为“星”会员，立即开启集星之旅。</span>
						</p>
						<div class="create-account">
							<a href="javascript:;" class="register button btn-bigger" @click="pageRedir(4)">
								<span>注册</span>
							</a>
						</div>
					</div>
				</section>
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
	import NavContainer from '@/components/navContainer'
	import NavOverlay from '@/components/NavOverlay'
	import NavMobile from '@/components/navMobile'
	import FormLogin from '@/components/formLogin'
	import CodeLogin from '@/components/codeLogin'
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
				curActive: 'login',
				view: 'FormLogin',
                showFormLogin: true
			}
		},
		mounted(){
			const _self = this;
			window.matchMedia('(min-width: 1025px)').addListener(()=>{
				_self.lgMedia = window.matchMedia('(min-width: 1025px)').matches;
			});
			this.trackingVisitor();
		},
		components: {
			NavContainer: NavContainer,
			NavOverlay: NavOverlay,
			NavMobile: NavMobile,
			FormLogin: FormLogin,
			CodeLogin: CodeLogin
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
			toggleLoginAct(){
				this.showFormLogin = !this.showFormLogin;
				this.view = (this.showFormLogin ? 'FormLogin' : 'CodeLogin');
			},
			trackingVisitor() {
				let storage = window.sessionStorage || null;
				if(storage) {
					let VisitorID = storage.getItem('VisitorID'),
						page = '我的账户-登录';
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
