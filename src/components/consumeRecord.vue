<template>
	<div>
		<div class="card consume" v-show="ExpensesRecord.length != 0 && !loading">
			<table>
				<thead>
					<tr>
						<td v-if="!mbMedia"></td>
						<td>日期</td>	
						<td>门店名称</td>
						<td>金额</td>
						<td v-if="!mbMedia">累计星星</td>
					</tr>
				</thead>
				<tbody>
					<tr class="no-data-msg" v-if="ExpensesRecord.length == 0 && !loading">
						<td colspan="5">您目前没有任何的消费记录，到邻近的星巴克消费吧。</td>
					</tr>
					<tr v-for="(item, index) in ExpensesRecord">
						<td v-if="!mbMedia">
							<img src="@/assets/icons/icon-coffee-and-phone.svg">
						</td>
						<td>
							{{item.ConsumeDate}}
							{{item.ConsumeDate.split(" ")[1].split(":")[0] < 12 ? 'AM' : 'PM'}}
						</td>
						<td>
							{{item.StoreName}}
						</td>
						<td>
							￥{{item.TotalPrice.toFixed(2)}}
						</td>
						<td @click="showRecordDetail(item)" v-if="!mbMedia">
							<img src="@/assets/icons/icon-info-green.svg">
						</td>
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
	import axios from 'axios'

	export default {
		data(){
			return {
				mbMedia: window.matchMedia('(max-width: 640px)').matches,
				ExpensesRecord: '',
				loading: false,
				show: false,
				detailOfItem: ''
			}
		},
		mounted(){
			window.matchMedia('(max-width: 640px)').addListener(()=>{
				this.mbMedia = window.matchMedia('(max-width: 640px)').matches;
			});
			this.checkLogin();
		},
		components: {
			MaskerLayer: MaskerLayer
		},
		methods: {
			checkLogin(){
				axios.post("users/checkLogin").then((res)=>{
					let data = res.data;
					if(data.status == '0'){
						let res = data.result;
						this.$store.commit('updateUserInfo', res.NickName);
						//如果当前为登录状态，则进一步获取用户信息
						this.getAccountInfo();
					}else{
						this.$store.commit('updateUserInfo', '');
					}
				});
			},
			getAccountInfo(){
				this.loading = true;
				axios.post("users/accountInfo").then((res)=>{
					let data = res.data;
					if(data.status == '0'){
						let res = data.result;
						this.ExpensesRecord = res.ExpensesRecord;
						this.loading = false;
					}
				});
			},
			showRecordDetail(item){
				this.detailOfItem = item;
				this.show = true;
			},
			closeRecordDetail(){
				this.show = false;
			}
		}
	}
</script>