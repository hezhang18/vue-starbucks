<template>
	<div>
		<div class="card gain" v-show="StarLev === 'Gold' && !loading">
			<table class="star-gain">
				<thead>
					<tr>
						<td colspan="4" v-if="!mbMedia">获取星星</td>
						<td colspan="3" v-if="mbMedia">获取星星</td>
						<td class="toggle-btn" @click="toggleIcon(0)" :class="{'showStarRec': showStarRec[0]}">
							<img src="@/assets/icons/icon-chevron-down.svg">
						</td>
					</tr>
				</thead>
				<tbody>
					<tr class="no-data-msg" v-if="RewardStarRecord.length == 0">
						<td colspan="5">您目前没有任何的获取星星记录，到邻近的星巴克消费吧。</td>
					</tr>
					<tr v-for="(item, index) in RewardStarRecord" v-show="RewardStarRecord.length != 0">
						<td v-if="!mbMedia">
							<img src="@/assets/icons/icon-rewards.svg">
						</td>
						<td colspan="2">
							门店消费<br />
							{{item.ConsumeDate.replace(/\//g, "-")}}
						</td>
						<td class="font-smaller">
							+{{item.StarsGain.toFixed(1)}}
							<img src="@/assets/icons/icon-star-gold.svg">
						</td>
						<td>
							<img src="@/assets/icons/icon-info-green.svg">
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="card minus"  v-show="StarLev === 'Gold' && !loading">
			<table class="star-minus">
				<thead>
					<tr>
						<td colspan="4">扣减星星</td>
						<td class="toggle-btn" @click="toggleIcon(1)" :class="{'showStarRec': showStarRec[1]}">
							<img src="@/assets/icons/icon-chevron-down.svg">
						</td>
					</tr>
				</thead>
				<tbody>
					<tr class="no-data-msg">
						<td colspan="5">您目前没有扣减星星记录，继续保持吧。</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="loading-svg center" v-show="StarLev !== 'Gold' && !loading" style="font-size:16px;padding: 12px 0;">
			升级到金星级才能拥有好礼星星，赶快升级吧
		</div>
		<div class="loading-svg center" v-if="loading" style="padding: 12px 0;">
			<img src="@/assets/loading-svg/loading-bubbles.svg" style="margin:0;" />
		</div>
	</div>
</template>

<script>
	import TokenTools from '@/utils/tokenTools'
	import CookieTools from '@/utils/cookieTools'
	import axios from 'axios'

	export default {
		data(){
			return {
				mbMedia: window.matchMedia('(max-width: 640px)').matches,
				StarLev: '',
				RewardStarRecord: '',
				loading: false,
				showStarRec: {
					0: true,
					1: true
				},
			}
		},
		mounted(){
			window.matchMedia('(max-width: 640px)').addListener(()=>{
				this.mbMedia = window.matchMedia('(max-width: 640px)').matches;
			});
			this.toggleArticle_JQListener();
			this.checkLogin();
		},
		methods: {
			toggleArticle_JQListener(){
				$('td.toggle-btn').click(function(){
					$(this).parent().parent().next().slideToggle(200);
				});
			},
			toggleIcon(index){
				this.showStarRec[index] = !this.showStarRec[index];
			},
			checkLogin(){
				let ReqToken = TokenTools.TokenSetting('sbux_token_cl');
				
				if(ReqToken){
					axios.post("users/checkLogin", {
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
							this.StarLev = res.MemberShip.StarLevel;
							// this.RewardStarRecord = res.RewardStarRecord;
							// 好礼星星，数据库暂时没有相关数据
							this.loading = false;
						}
						CookieTools.DelCookie('sbux_token_gai');
					})
				}
			}
		}
	}
</script>