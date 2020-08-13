<template>
	<div class="wrapper">
		<section class="rewards-record consume-record" v-show="!loading">
			<div class="card">
				<table class="rewards-list star-gain">
					<thead>
						<tr>
							<td colspan="4">当前好礼</td>
							<td class="toggle-btn" @click="toggleIcon(0)" :class="{'showStarRec': showStarRec[0]}">
								<img src="@/assets/icons/icon-chevron-down.svg">
							</td>
						</tr>
					</thead>
					<tbody class="show-init">
						<tr v-for="(item, index) in AvlRewd" v-show="AvlRewd.length != 0">
							<td>
								<img src="@/assets/icons/icon-reward-gold.svg">
							</td>
							<td colspan="3">
								<h4>1 × {{item.Title}}</h4>
								<p>有效期至 {{item.ExpireDate}}</p>
							</td>
							<td @click="showRecordDetail(item)">
								<img src="@/assets/icons/icon-info-green.svg">
							</td>
						</tr>
						<tr v-if="AvlRewd.length == 0">
							<td colspan="5" style="text-align:center;">暂无对应好礼。</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="card">
				<table class="rewards-list star-gain">
					<thead>
						<tr>
							<td colspan="4">未生效好礼</td>
							<td class="toggle-btn" @click="toggleIcon(1)" :class="{'showStarRec': showStarRec[1]}">
								<img src="@/assets/icons/icon-chevron-down.svg">
							</td>
						</tr>
					</thead>
					<tbody class="hide-init">
						<tr v-for="(item, index) in UnAvlRewd" v-show="UnAvlRewd.length != 0">
							<td>
								<img src="@/assets/icons/icon-reward-gold.svg">
							</td>
							<td colspan="3">
								<h4>1 × {{item.Title}}</h4>
								<p>生效日期 {{item.StartDate}}</p>
							</td>
							<td @click="showRecordDetail(item)">
								<img src="@/assets/icons/icon-info-green.svg">
							</td>
						</tr>
						<tr v-show="UnAvlRewd.length == 0">
							<td colspan="5" style="text-align:center;">暂无对应好礼。</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="card">
				<table class="rewards-list star-gain">
					<thead>
						<tr>
							<td colspan="4">已兑好礼</td>
							<td class="toggle-btn" @click="toggleIcon(2)" :class="{'showStarRec': showStarRec[2]}">
								<img src="@/assets/icons/icon-chevron-down.svg">
							</td>
						</tr>
					</thead>
					<tbody class="hide-init">
						<tr v-for="(item, index) in UsedRewd" v-show="UsedRewd.length != 0">
							<td>
								<img src="@/assets/icons/icon-reward-gold.svg">
							</td>
							<td colspan="3">
								<h4>1 × {{item.Title}}</h4>
								<p>使用于 {{item.UseDate}}</p>
							</td>
							<td @click="showRecordDetail(item)">
								<img src="@/assets/icons/icon-info-green.svg">
							</td>
						</tr>
						<tr v-show="UsedRewd.length == 0">
							<td colspan="5" style="text-align:center;">暂无对应好礼。</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="card">
				<table class="rewards-list star-gain">
					<thead>
						<tr>
							<td colspan="4">过期好礼</td>
							<td class="toggle-btn" @click="toggleIcon(3)" :class="{'showStarRec': showStarRec[3]}">
								<img src="@/assets/icons/icon-chevron-down.svg">
							</td>
						</tr>
					</thead>
					<tbody class="hide-init">
						<tr v-for="(item, index) in ExpRewd" v-show="ExpRewd.length != 0">
							<td>
								<img src="@/assets/icons/icon-reward-gold.svg">
							</td>
							<td colspan="3">
								<h4>1 × {{item.Title}}</h4>
								<p>过期于 {{item.ExpireDate}}</p>
							</td>
							<td @click="showRecordDetail(item)">
								<img src="@/assets/icons/icon-info-green.svg">
							</td>
						</tr>
						<tr v-show="ExpRewd.length == 0">
							<td colspan="5" style="text-align:center;">暂无对应好礼。</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
		<masker-layer v-if="show" :detailOfItem="detailOfItem" v-on:close="closeRecordDetail"></masker-layer>
		<div class="loading-svg center" v-if="loading" style="padding: 12px 0;">
			<img src="@/assets/loading-svg/loading-bubbles.svg" style="margin:0;" />
		</div>
	</div>
</template>

<script>
	import MaskerLayer from '@/components/MaskerLayerReward'
	import TokenTools from '@/utils/tokenTools'
	import CookieTools from '@/utils/cookieTools'
	import axios from 'axios'

	export default {
		data(){
			return {
				showStarRec: {
					0: true,
					1: false,
					2: false,
					3: false
				},
				AvlRewd: '',
				UsedRewd: '',
				ExpRewd: '',
				UnAvlRewd: '',
				loading: false,
				show: false,
				detailOfItem: ''
			}
		},
		mounted(){
			this.toggleArticle_JQListener();
			this.getAccountInfo();
		},
		components: {
			MaskerLayer: MaskerLayer
		},
		methods: {
			toggleArticle_JQListener(){
				$('tbody.hide-init').css('display','none');
				$('td.toggle-btn').click(function(){
					$(this).parent().parent().next().slideToggle(200);
				});
			},
			toggleIcon(index){
					this.showStarRec[index] = !this.showStarRec[index];
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
							
							let MyRewards = res.MyRewards,
								AvlRewd = [],
								UsedRewd = [],
								ExpRewd = [];

							for(let i = 0; i < MyRewards.length; i++){
								if(MyRewards[i].State === 'AVL'){
									AvlRewd.push(MyRewards[i]);
								}else if(MyRewards[i].State === 'USED'){
									UsedRewd.push(MyRewards[i]);
								}else if(MyRewards[i].State === 'EXP'){
									ExpRewd.push(MyRewards[i]);
								}
							}
							this.AvlRewd = AvlRewd;
							this.UsedRewd = UsedRewd;
							this.ExpRewd = ExpRewd;
							this.UnAvlRewd = [];

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
						page = '星享好礼-弹窗';
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