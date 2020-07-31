<template>
	<div class="masker-layer">
		<div class="dialog">
			<header class="clearfix">
				<button @click="close">×</button>
				<h3>消费记录</h3>
			</header>
			<div class="body">
				<div>
					<div class="amount">￥{{detailOfItem.TotalPrice.toFixed(2)}}</div>
					<div class="store">{{detailOfItem.StoreName}}</div>
					<div class="date">{{detailOfItem.ConsumeDate.replace(/\//g,'-')}}</div>
					<!-- <div class="date">{{detailOfItem.ConsumeDate ? detailOfItem.ConsumeDate.replace(/\//g,'-') : ''}}</div> -->
				</div>
				<hr />
				<table>
					<tbody>
						<tr>
							<td>SR虚拟卡 ×1</td>
							<td>￥ 0.00</td>
						</tr>
						<tr v-for="(item, index) in detailOfItem.GoodsItem">
							<td>{{item.GoodsName}} ×{{item.GoodsNum}}</td>
							<td>￥ {{item.GoodsPrice.toFixed(2)}}</td>
						</tr>
						<tr><td colspan="2"><hr /></td></tr>
						<tr>
							<td>消费总计</td>
							<td>￥ {{detailOfItem.TotalPrice.toFixed(2)}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="earned-stars">
				<span>本次消费共获得</span>
				+{{detailOfItem.StarsGain.toFixed(1)}}
				<img src="@/assets/icons/icon-star-gold.svg">
			</div>
			<footer>
				<button class="button" @click="close">关闭</button>
			</footer>
		</div>
	</div>
</template>
<style>
	.masker-layer {
		position: fixed;
		left: 30%;
		top: 0;
		width: 70%;
		height: 100%;
		background: rgba(0, 0, 0, 0.56);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.masker-layer .dialog {
		width: 100%;
		max-width: 540px;
		background: #FFF;
		border-radius: 8px;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.56);
		padding: 24px;
		transform: scale(1);
		transition-duration: .2s;
		transition-property: transform, opacity;
	}

	.masker-layer .dialog header>h3 {
		font-size: 20px;
		font-family: "Gothma-bold";
		text-align: center;
		margin-bottom: 18px;
	}

	.masker-layer .dialog header>button {
		float: right;
		width: 48px;
		height: 48px;
		margin: -12px;
		background: url(~@/assets/icons/icon-close.svg) no-repeat center center;
		opacity: .8;
		color: transparent;
		transition-duration: .2s;
		transition-property: opacity;
		border: none;
		outline: none;
	}

	.masker-layer .dialog header>button:hover {
		opacity: 1.0;
	}

	.masker-layer .dialog .body {
		padding: 0 55px;
	}

	.masker-layer .dialog .body hr {
		height: 1px;
		margin: 36px auto;
		background: rgba(0, 0, 0, 0.12);
		border: 0;
	}

	.masker-layer .dialog .body div .amount {
		margin-bottom: 17px;
		text-align: center;
		font-size: 26px;
		color: rgba(0, 0, 0, 0.87);
		line-height: 24px;
	}

	.masker-layer .dialog .body div .store,
	.masker-layer .dialog .body div .date {
		text-align: center;
		font-size: 14px;
		line-height: 24px;
	}

	.masker-layer .dialog .body div .store {
		color: rgba(0, 0, 0, 0.87);
	}

	.masker-layer .dialog .body div .date {
		color: rgba(0, 0, 0, 0.56);
	}
	
	.masker-layer .dialog .body table {
		width: 100%;
	}

	.masker-layer .dialog .body table tbody tr {
		width: 100%;
		font-size: 17px;
	}

	.masker-layer .dialog .body table tbody tr td {
		padding: 12px;
	}

	.masker-layer .dialog .body table tbody tr td:nth-child(1) {
		text-align: left;
		font-family: "Gothma-bold";
		font-weight: bold;
	}

	.masker-layer .dialog .body table tbody tr td:nth-child(2) {
		text-align: right;
		font-family: "Gothma-book";
		font-weight: normal;
	}

	.masker-layer .dialog .earned-stars {
		padding: 0 67px;
		text-align: right;
		font-size: 14px;
		color: rgba(0, 0, 0, 0.87);
		line-height: 160%;
		letter-spacing: 0.4px;
	}

	.masker-layer .dialog .earned-stars img {
		width: 14px;
		height: 14px;
		position: relative;
		top: -2px;
	}

	.masker-layer .dialog footer {
		margin-top: 24px;
		text-align: center;
	}

	.masker-layer .dialog footer .button {
		margin: 4px;
		padding: 6px 18px;
		background: rgba(255, 255, 255, 0);
		outline: none;
	}

	@media (max-width: 1024px)
	{
		.masker-layer{
			left: 0;
			width: 100%;
		}
	}

	@media (max-width: 640px)
	{
		.masker-layer{
			left: 0;
			width: 100%;
		}

		.masker-layer .dialog {
			width: 90%;
			height: 80%;
			margin-bottom: 15%;
			overflow: scroll;
		}

		.masker-layer .dialog .body {
			padding: 0 16px;
		}

		.masker-layer .dialog header .text-desc h3 {
			font-size: 1.6rem;
		}

		.masker-layer .dialog header .text-desc p {
			font-size: 1.2rem;
		}
		
	}
</style>
<script>
	import axios from 'axios'

	export default {
		props: ["detailOfItem"],
		methods: {
			close(){
				this.$emit("close");
			}
		}
	}
</script>