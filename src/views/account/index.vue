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
			<article class="content account-summary-login" v-if="lgMedia || !show_menu_bol">
				<div class="loading-svg center" v-if="loading" style="margin:-24px 0;padding: 24px 0;background: #FFF;">
					<img src="@/assets/loading-svg/loading-bubbles.svg"/>
				</div>
				<div class="wrapper" v-show="!loading">
					<section class="account-info-login white" :class="{'bg-silver':StarLev == 'White', 'bg-green':StarLev == 'Green', 'bg-gold':StarLev == 'Gold'}">
						<header class="clearfix">
							<h2>{{StarLev_CN}}</h2>
							<img src="@/assets/icons/icon-rewards-white.svg" v-if="StarLev == 'White'">
								<img src="@/assets/icons/icon-rewards.svg" v-if="StarLev !== 'White'">
						</header>
						<div class="body" :class="{'star-bg-welcome':!mbMedia && StarLev == 'White', 'star-bg-green':!mbMedia && StarLev == 'Green', 'star-bg-gold':!mbMedia && StarLev == 'Gold'}">
							<div class="user-info">
								<div class="tier-progress" v-show="StarLev !== 'Gold'">
									<div class="star-count">
										{{StarsNum}}
										<span>
											<img src="@/assets/icons/icon-star-white.svg" v-if="StarLev == 'White'">
											<img src="@/assets/icons/icon-star-green.svg" v-if="StarLev == 'Green'">
										</span>
									</div>
									<div class="tier-bg" :class="{'tier-bg-silver': StarLev == 'White', 'tier-bg-green': StarLev == 'Green', 'tier-bg-gold': StarLev == 'Gold'}">
										<div class="fill fill-white"></div>
										<div class="fill fill-green"></div>
									</div>
									<div class="tier-tag white-tag">
										<span>银星级</span>
									</div>
									<div class="tier-tag green-tag">
										<span>玉星级</span>
									</div>
									<div class="tier-tag gold-tag">
										<span>金星级</span>
									</div>
								</div>
								<div class="tier-progress" v-show="StarLev == 'Gold'">
									<div class="star-count">
										{{StarsNum}}
										<span>
											<img src="@/assets/icons/icon-star-gold.svg">
										</span>
									</div>
									<div class="tier-bg tier-bg-gold">
										<div class="fill fill-gold"></div>
									</div>
									<div class="tier-tag gold-tag-for-keep">
										<span>金星级</span>
									</div>
									<div class="tier-tag keep-tag">
										<span>保级</span>
									</div>
								</div>
								<div class="star-lev">
									<span>目前星星数：{{StarsNum}}</span>
								</div>
								<div class="privileges">
									<div class="privileges-title">
										<span>会员权益：</span>
									</div>
									<div class="privileges-items">
										<div class="sBadge-member sBadge-green clearfix">
											<div class="items">
												<div class="sBadge" :class="{'badge-bg-grey': StarLev == 'White', 'badge-bg-white': StarLev !== 'White'}">
													<img src="@/assets/icons/icon-coupon-white.svg" v-if="GreenLock">
													<img src="@/assets/icons/icon-coupon-green.svg" v-if="!GreenLock && StarLev == 'Green'">
													<img src="@/assets/icons/icon-coupon-gold.svg" v-if="!GreenLock && StarLev == 'Gold'">
												</div>
												<div class="lock bg-green" v-if="GreenLock">
													<img src="@/assets/icons/icon-lock-white.svg">
												</div>
												<span>玉星晋级饮品券</span>
											</div>
											<div class="items">
												<div class="sBadge" :class="{'badge-bg-grey': StarLev == 'White', 'badge-bg-white': StarLev !== 'White'}">
													<img src="@/assets/icons/icon-birthday-white.svg" v-if="GreenLock">
													<img src="@/assets/icons/icon-birthday-green.svg" v-if="!GreenLock && StarLev == 'Green'">
													<img src="@/assets/icons/icon-birthday-gold.svg" v-if="!GreenLock && StarLev == 'Gold'">
												</div>
												<div class="lock bg-green" v-if="GreenLock">
													<img src="@/assets/icons/icon-lock-white.svg">
												</div>
												<span>生日饮品券</span>
											</div>
											<div class="items">
												<div class="sBadge" :class="{'badge-bg-grey': StarLev == 'White', 'badge-bg-white': StarLev !== 'White'}">
													<img src="@/assets/icons/icon-coupon-white.svg" v-if="GreenLock">
													<img src="@/assets/icons/icon-coupon-green.svg" v-if="!GreenLock && StarLev == 'Green'">
													<img src="@/assets/icons/icon-coupon-gold.svg" v-if="!GreenLock && StarLev == 'Gold'">
												</div>
												<div class="lock bg-green" v-if="GreenLock">
													<img src="@/assets/icons/icon-lock-white.svg">
												</div>
												<span>金星在望饮品券</span>
											</div>
											<div class="items">
												<div class="sBadge" :class="{'badge-bg-grey': StarLev == 'White', 'badge-bg-white': StarLev !== 'White'}">
													<img src="@/assets/icons/icon-crown-white.svg" v-if="GreenLock">
													<img src="@/assets/icons/icon-crown-green.svg" v-if="!GreenLock && StarLev == 'Green'">
													<img src="@/assets/icons/icon-crown-gold.svg" v-if="!GreenLock && StarLev == 'Gold'">
												</div>
												<div class="lock bg-green" v-if="GreenLock">
													<img src="@/assets/icons/icon-lock-white.svg">
												</div>
												<span>永享玉星级</span>
											</div>
										</div>
										<div class="sBadge-member sBadge-gold clearfix">
											<div class="items">
												<div class="sBadge" :class="{'badge-bg-grey': StarLev == 'White', 'badge-bg-green': StarLev == 'Green', 'badge-bg-white': StarLev == 'Gold'}">
													<img src="@/assets/icons/icon-coupon-white.svg" v-if="GoldLock">
													<img src="@/assets/icons/icon-coupon-gold.svg" v-if="!GoldLock && StarLev == 'Gold'">
												</div>
												<div class="lock bg-gold" v-if="GoldLock">
													<img src="@/assets/icons/icon-lock-white.svg">
												</div>
												<span>金星晋级饮品券</span>
											</div>
											<div class="items">
												<div class="sBadge" :class="{'badge-bg-grey': StarLev == 'White', 'badge-bg-green': StarLev == 'Green', 'badge-bg-white': StarLev == 'Gold'}">
													<img src="@/assets/icons/icon-coupon-white.svg" v-if="GoldLock">
													<img src="@/assets/icons/icon-coupon-gold.svg" v-if="!GoldLock && StarLev == 'Gold'">
												</div>
												<div class="lock bg-gold" v-if="GoldLock">
													<img src="@/assets/icons/icon-lock-white.svg">
												</div>
												<span>周年庆饮品券</span>
											</div>
											<div class="items">
												<div class="sBadge" :class="{'badge-bg-grey': StarLev == 'White', 'badge-bg-green': StarLev == 'Green', 'badge-bg-white': StarLev == 'Gold'}">
													<img src="@/assets/icons/icon-drinks-white.svg" v-if="GoldLock">
													<img src="@/assets/icons/icon-drinks-gold.svg" v-if="!GoldLock && StarLev == 'Gold'">
												</div>
												<div class="lock bg-gold" v-if="GoldLock">
													<img src="@/assets/icons/icon-lock-white.svg">
												</div>
												<span>好礼星星兑换</span>
											</div>
											<div class="items">
												<div class="sBadge" :class="{'badge-bg-grey': StarLev == 'White', 'badge-bg-green': StarLev == 'Green', 'badge-bg-white': StarLev == 'Gold'}">
													<img src="@/assets/icons/icon-camera-white.svg" v-if="GoldLock">
													<img src="@/assets/icons/icon-camera-gold.svg" v-if="!GoldLock && StarLev == 'Gold'">
												</div>
												<div class="lock bg-gold" v-if="GoldLock">
													<img src="@/assets/icons/icon-lock-white.svg">
												</div>
												<span>专属金卡</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="corner">
								<span>
									<strong>会员到期日：</strong>{{ExpireDate}}
								</span>
								<span>再积 {{StarsOfNextLevNeed - StarsNum}} 颗星即可升到金星级</span>
							</div>
						</div>
					</section>
					<section class="account-svc-login bg-white black">
						<header class="clearfix" v-if="CardNum != 0">
							<h2>管理星礼卡</h2>
							<img src="@/assets/icons/icon-card.svg">
							<strong>{{CardNum}}</strong>
						</header>
						<div class="body" v-if="CardNum != 0">
							<div class="scroll clearfix">
								<div class="card-item" v-for=" (item, index) in SvcCard.slice(0, 6)">
									<span class="balance">¥ {{item.Balance}}</span>
									<img :src="'/static/images/svc-card/'+item.CardImage">
									<span class="card_id">{{item.CardID}}</span>
								</div>
							</div>
						</div>
						<footer v-if="CardNum != 0">
							<span @click="pageRedir(13)">查看所有卡片</span>
						</footer>
						<div class="demo-wrapper clearfix" v-if="CardNum == 0">
							<div class="card-demo">
								<img src="/static/images/svc-card/svc_main_flower@3x.png">
							</div>
							<div class="desc-demo">
								<div class="title">
									<img src="@/assets/icons/icon-card.svg">
									<span>星礼卡</span>
								</div>
								<h2>用一份星礼 让心意相随</h2>
								<h4>星礼卡，表达感谢与传递祝福的最佳方式</h4>
								<div class="card-btn clearfix">
									<span class="button btn-bigger">绑定星礼卡/星礼包</span>
									<span class="button btn-bigger">查看详情</span>
								</div>
							</div>
						</div>
					</section>
					<section class="account-myrewards-login bg-white black">
						<header class="clearfix">
							<h2>星享好礼</h2>
							<img src="@/assets/icons/icon-gift.svg">
							<strong>{{RewardsNum}}</strong>
						</header>
						<div class="body">
							<ul class="list">
								<li v-for="(item, index) in MyRewards.slice(0, 4)" v-show="ExpensesRecord.length != 0">
									<img src="@/assets/icons/icon-reward-gold.svg">
									<h4>{{item.Title}}</h4>
									<p>{{item.ExpireDate}}</p>
								</li>
								<li v-if="ExpensesRecord.length == 0">
									<h4 style="margin:12px 0 12px -36px;">您目前没有任何的星享好礼。</h4>
								</li>
							</ul>
						</div>
						<footer>
							<span @click="pageRedir(7)">查看好礼详情</span>
						</footer>
					</section>
					<section class="account-activity-login bg-white black">
						<header class="clearfix">
							<h2>消费记录</h2>
							<img src="@/assets/icons/icon-receipt.svg">
						</header>
						<div class="body">
							<ul class="list">
								<li v-for="(item, index) in ExpensesRecord.slice(0, 4)" v-show="ExpensesRecord.length != 0">
									<img src="@/assets/icons/icon-coffee-dark.svg">
									<h4>
										<span>{{item.StoreName}}</span>
										<span>￥{{item.TotalPrice.toFixed(2)}}</span>
									</h4>
									<p>{{item.ConsumeDate.split(" ")[0]}}</p>
								</li>
								<li v-if="ExpensesRecord.length == 0">
									<h4 style="margin:12px 0 12px -36px;">您目前没有任何的消费记录，到邻近的星巴克消费吧。</h4>
								</li>
							</ul>
						</div>
						<footer>
							<span @click="pageRedir(6)">查看更多</span>
						</footer>
					</section>
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
				curActive: 'account',
				welcome: [
					'早上好!',
					'上午好!',
					'中午好!',
					'下午好!',
					'晚上好!'
				],
				hello: '您好!',
				loading: false,
				StarLev: '',
				StarLev_CN:'',
				StarsNum: '',
				StarsOfNextLevNeed: '',
				ExpireDate: '',
				GreenLock: true,
				GoldLock: true,
				SvcCard: '',
				CardNum: '',
				MyRewards: '',
				RewardsNum: '',
				ExpensesRecord: ''
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
			this.getHelloWord();
			this.checkExpire();
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
			checkExpire(){
				this.loading = true;

				let ReqToken = TokenTools.TokenSetting('sbux_token_ce');
				
				if(ReqToken){
					axios.post("users/checkExpireDate", {
						ReqToken: ReqToken
					}).then((res)=>{
						let data = res.data;
						if(data.status == '0'){
							CookieTools.DelCookie('sbux_token_ce');
							this.getAccountInfo();
						}
						CookieTools.DelCookie('sbux_token_ce');
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
				this.$store.commit('updateUserInfo', CookieTools.GetCookie('NickName'));
			},
			getAccountInfo(){
				this.loading = true;

				let ReqToken = TokenTools.TokenSetting('sbux_token_gai');
				
				if(ReqToken){
					axios.post("users/accountInfo", {
						ReqToken: ReqToken
					}).then((res)=>{
						let data = res.data;
						if(data.status == '0'){
							let res = data.result;

							/* ***星级部分*** */
							this.StarLev = res.MemberShip.StarLevel;
							this.StarsNum = res.MemberShip.StarsNumber;
							this.StarsOfNextLevNeed = res.MemberShip.StarsOfNextLevNeed;
							this.ExpireDate = res.MemberShip.ExpireDate;
							this.starLevRender();

							/* ***管理星礼卡部分*** */
							this.SvcCard = res.SvcCard;
							this.CardNum = res.SvcCard.length;

							/* ***星享好礼部分*** */
							let MyRewards = res.MyRewards,
								AvlRewd = [];
							for(let i = 0; i < MyRewards.length; i++){
								if(MyRewards[i].State === 'AVL'){
									AvlRewd.push(MyRewards[i]);
								}
							}
							this.MyRewards = AvlRewd;
							this.RewardsNum = AvlRewd.length;

							/* ***消费记录部分*** */
							this.ExpensesRecord = res.ExpensesRecord;

							/* ***删除验证使用后的token*** */
							CookieTools.DelCookie('sbux_token_gai');

							this.loading = false;
						}
					})
				}	
			},
			starLevRender(){
				let whiteWD = '0%',
					greenWD = '0%',
					goldWD = '0%',
					left_dis = '0%';
				
				switch(this.StarLev){
					case 'White':
						this.StarLev_CN = '银星级';
						this.GreenLock = true;
						this.GoldLock = true;
						whiteWD = Math.floor((this.StarsNum/this.StarsOfNextLevNeed)*25);
						greenWD = 0;
						break;
					case 'Green':
						this.StarLev_CN = '玉星级';
						this.GreenLock = false;
						this.GoldLock = true;
						whiteWD = 25;
						greenWD = Math.floor((this.StarsNum/this.StarsOfNextLevNeed)*75);
						break;
					case 'Gold':
						this.StarLev_CN = '金星级';
						this.GreenLock = false;
						this.GoldLock = false;
						goldWD = Math.floor((this.StarsNum/this.StarsOfNextLevNeed)*100);
						break;
				}
				
				if(this.StarLev == 'Gold'){
					left_dis = goldWD + '%';

					$('.fill-gold').css({
						'width': goldWD + '%'
					});
					
					$('.star-count').css({
						'left': 'calc(' + left_dis + ' - 55px)'
					});
				}else{
					left_dis = whiteWD + greenWD + '%';

					$('.fill-white').css({
						'width': whiteWD + '%'
					});

					$('.fill-green').css({
						'width': greenWD + '%'
					});

					$('.star-count').css({
						'left': 'calc(' + left_dis + ' - 55px)'
					});
				}
			},
			trackingVisitor() {
				let storage = window.sessionStorage || null;
				if(storage) {
					let VisitorID = storage.getItem('VisitorID'),
						page = '我的账户-主页';
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
