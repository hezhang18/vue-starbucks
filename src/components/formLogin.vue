<template>
	<div class="login-filed form-area">
		<div class="login-form-username">
			<input type="text" id="username" name="username" placeholder="用户名或者电子邮箱" @keyup.enter="login" v-model="username">
			<label for="username" class="form-label">用户名或者电子邮箱</label>
		</div>
		<div class="login-form-password">
			<input type="password" id="password" name="password" placeholder="密码" @keyup.enter="login" v-model="password">
			<label for="password" class="form-label">密码</label>
			<div class="toggle-password" :class="{'show-password': showPW, 'hide-password': !showPW }" @click="togglePWDisplay"></div>
		</div>
		<div class="login-checkbox">
			<input type="checkbox" id="login-remember" value="on" @click="toggleAutoLogin(false)" checked>
			<label for="login-remember">
				<span>下次自动登录</span>
			</label>
		</div>
		<div class="forget-password">
			<a href="javascript:;">忘记密码?</a>
		</div>
		<div class="loading-svg center" v-if="loading">
			<img src="@/assets/loading-svg/loading-spin.svg"/>
		</div>
		<div class="error-tip" v-if="errorTip">
			<span>用户名或密码错误</span>
		</div>
		<div class="login-action button" @click="login">
			<a href="javascript:;">登录</a>
		</div>
	</div> 
</template>

<script>

	import axios from 'axios'
	import CheckTools from '@/utils/checkTools'
	import TokenTools from '@/utils/tokenTools'
	import CookieTools from '@/utils/cookieTools'
	
	export default {
		data(){
			return {
				username: '',
				password: '',
				errorTip: false,
				autoLogin: true,
                showPW: false,
				nickName: false,
				loading: false
			}
		},
		watch: {
			'username': function(){
				$('input[id=username]').focus();
			},
			'password': function(){
				$('input[id=password]').focus();
			}
		},
		mounted(){
			this.init();

			setTimeout(()=>{
				this.username = 'ZhangHe';
				this.password = 'HelloWorld';
			}, 1200);
		},
		methods: {
			init(){
				let _self = this;

				$('input[placeholder]').focus(function(){
					let inputID = $(this).attr('id'),
						label = $('label[for=' + inputID + ']');

					label.animate({
						'top': '-24px',
						'font-size': '13px',
						'font-weight': '400',
						'opacity': '0.56',
					}, 200);

					$(this).css({
						'border-bottom': '1px solid #00A862'
					});

				}).blur(function(){
					let inputID = $(this).attr('id'),
						label = $('label[for=' + inputID + ']');

					// 有数据时保持focus状态，_self[inputID]表示_self.username或_self.password
					if(_self[inputID] === ''){
						label.animate({
							'top': '0',
							'font-size': '16px',
							'font-weight': '400',
							'opacity': '0.32'
						}, 200);

						$(this).css({
							'border-bottom': '1px solid rgba(0, 0, 0, 0.24)'
						});

					}else{
						$(this).css({
							'border-bottom': '1px solid #00A862'
						});
					}
				});

				this.toggleAutoLogin(true);
			},
			togglePWDisplay(){
				// 控制密码明密文展示
				this.showPW = !this.showPW;
				if(this.showPW){
					$('input[name=password]').attr('type', 'text');
				}else{
					$('input[name=password]').attr('type', 'password');
				}
			},
			toggleAutoLogin(init){
				if(!init){
					this.autoLogin = !this.autoLogin;
				}
				if(this.autoLogin){
					$('<style>input[type=checkbox]::before{display: none;}</style>').appendTo('head');
					$('<style>input[type=checkbox]::after{display: block;}</style>').appendTo('head');
				}else{
					$('<style>input[type=checkbox]::before{display: block;}</style>').appendTo('head');
					$('<style>input[type=checkbox]::after{display: none;}</style>').appendTo('head');
				}

				setTimeout(()=>{
					let val = $('input[type=checkbox]:checked').val();
					if(val){
                        this.autoLogin = true;
                    }else{
                    	this.autoLogin = false;
                    }
				},100);
			},
			login(){
				let UserNameCheckRes = CheckTools.UserNameRegExp.test(this.username),
					PasswordCheckRes = CheckTools.PasswordRegExp.test(this.password);
				if(!UserNameCheckRes || !PasswordCheckRes){
					this.errorTip = true;
					setTimeout(()=>{
						this.errorTip = false;
					}, 2000);
					return ;
				}

				this.loading = true;
				
				axios.post("/users/login", {
					UserName: this.username,
					Password: this.password,
					AutoLogin: this.autoLogin,
				}).then((res)=>{
					let data = res.data;
					if(data.status == '0'){
						let res = data.result;
						this.$store.commit('updateUserInfo', res.NickName);
						this.$store.commit('pageRedir', 2);
						this.errorTip = false;
						this.loading = false;
					}else{
						this.loading = false;
						this.errorTip = true;
						setTimeout(()=>{
							this.errorTip = false;
						}, 1200);
					}

					let storage = window.sessionStorage || null;
					if(storage) {
						axios.post('/users/trackLogin', {
							visitorID: storage.getItem('VisitorID')
						})
					}
				})
			}
		}
	}

</script>