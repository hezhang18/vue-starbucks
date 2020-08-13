<template>
	<div>
		<div class="card gain" v-show="ExpensesRecord.length != 0 && !loading">
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
					<tr class="no-data-msg" v-if="ExpensesRecord.length == 0 && !loading">
						<td colspan="5">您目前没有任何的获取星星记录，到邻近的星巴克消费吧。</td>
					</tr>
					<tr v-for="(item, index) in ExpensesRecord" v-show="ExpensesRecord.length != 0">
						<td v-if="!mbMedia">
							<img src="@/assets/icons/icon-rewards.svg">
						</td>
						<td colspan="2">
							<h4>门店消费</h4>
							{{item.ConsumeDate.replace(/\//g, "-")}}
						</td>
						<td class="font-smaller">
							+{{item.StarsGain.toFixed(1)}}
							<img src="@/assets/icons/icon-star-gold.svg">
						</td>
						<td @click="showRecordDetail(item)">
							<img src="@/assets/icons/icon-info-green.svg">
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="card minus"  v-show="ExpensesRecord.length != 0 && !loading">
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
		<masker-layer v-if="show" :detailOfItem="detailOfItem" v-on:close="closeRecordDetail"></masker-layer>
		<div class="loading-svg center" v-if="loading" style="padding: 12px 0;">
			<img src="@/assets/loading-svg/loading-bubbles.svg" style="margin:0;" />
		</div>
	</div>
</template>

<script>
	import MaskerLayer from '@/components/MaskerLayerConsume'
	import TokenTools from '@/utils/tokenTools'
	import CookieTools from '@/utils/cookieTools'
	import axios from 'axios'

	export default {
		data(){
			return {
				mbMedia: window.matchMedia('(max-width: 640px)').matches,
				ExpensesRecord: '',
				loading: false,
				showStarRec: {
					0: true,
					1: true
				},
				show: false,
				detailOfItem: ''
			}
		},
		mounted(){
			window.matchMedia('(max-width: 640px)').addListener(()=>{
				this.mbMedia = window.matchMedia('(max-width: 640px)').matches;
			});
			this.toggleArticle_JQListener();
			this.checkLogin();
		},
		components: {
			MaskerLayer: MaskerLayer
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
					axios.post("users/accountInfo", {
						ReqToken: ReqToken
					}).then((res)=>{
						let data = res.data;
						if(data.status == '0'){
							let res = data.result;
							this.ExpensesRecord = res.ExpensesRecord;
							this.loading = false;
						}
						CookieTools.DelCookie('sbux_token_gai');
					})
				}
			},
			showRecordDetail(item){
				this.detailOfItem = item;
				this.show = true;
				this.trackingVisitor();
			},
			closeRecordDetail(){
				this.show = false;
			},
			trackingVisitor() {
				let storage = window.sessionStorage || null;
				if(storage) {
					let VisitorID = storage.getItem('VisitorID'),
						page = '获取星星-弹窗';
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