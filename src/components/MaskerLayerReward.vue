<template>
	<div class="masker-layer-rewd">
		<div class="dialog-rewd">
			<header class="clearfix">
				<button @click="close">×</button>
				<div class="text-desc">
					<h3>{{detailOfItem.Title}}</h3>
					<p>开始日期：{{detailOfItem.StartDate}}</p>
					<p>过期日期：{{detailOfItem.ExpireDate}}</p>
					<p>是否兑换：{{detailOfItem.State === 'USED' ? '是' : '否'}}</p>
				</div>
				<div class="img-desc">
					<img :src="'/static/images/sbux-rewards/'+detailOfItem.Image">
				</div>
			</header>
			<div class="rules">
				<div>
					<p>好礼使用规则：</p>
					<p v-for="text in detailOfItem.Rules.split('|')">
						{{text}}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
	.masker-layer-rewd {
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

	.masker-layer-rewd .dialog-rewd {
		width: 100%;
		max-width: 444px;
		background: #FFF;
		border-radius: 8px;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.56);
		padding: 24px;
		transform: scale(1);
		transition-duration: .2s;
		transition-property: transform, opacity;
	}

	.masker-layer-rewd .dialog-rewd header {
		position: relative;
	}

	.masker-layer-rewd .dialog-rewd header>button {
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

	.masker-layer-rewd .dialog-rewd header>button:hover {
		opacity: 1.0;
	}

	.masker-layer-rewd .dialog-rewd header .text-desc {
		margin: 0 -24px 0;
		padding: 0 24px 24px;
		border-bottom: 2px solid #f7f7f7;
		text-align: left;
		font-family: "Gothma-bold";
		letter-spacing: 0.4px;
	}

	.masker-layer-rewd .dialog-rewd header .text-desc h3 {
		font-size: 2.0rem;
		color: #00A862;
		line-height: 30px;
	}

	.masker-layer-rewd .dialog-rewd header .text-desc p {
		font-size: 1.5rem;
		color: rgba(0, 0, 0, 0.56);
		font-family: "Gothma-book";
		line-height: 24px;
	}

	.masker-layer-rewd .dialog-rewd header .img-desc {
		position: absolute;
		right: 48px;
		top: 0;
		width: 30%;
	}

	.masker-layer-rewd .dialog-rewd header .img-desc img {
		width: 100%;
		max-width: 100%;
	}

	.masker-layer-rewd .dialog-rewd .rules {
		padding: 24px;
	}

	.masker-layer-rewd .dialog-rewd .rules p {
		font-size: 1.6rem;
		font-weight: 400;
		color: rgba(0, 0, 0, 0.67);
		font-family: "Gothma-book";
		line-height: 160%;
		letter-spacing: 0.4px;
	}
	
	@media (max-width: 1024px)
	{
		.masker-layer-rewd {
			left: 0;
			width: 100%;
		}
	}

	@media (max-width: 640px)
	{
		.masker-layer-rewd {
			left: 0;
			width: 100%;
		}

		.masker-layer-rewd .dialog-rewd {
			width: 90%;
			height: 80%;
			margin-bottom: 15%;
			overflow: scroll;
		}

		.masker-layer-rewd .dialog-rewd header .text-desc h3 {
			font-size: 1.6rem;
		}

		.masker-layer-rewd .dialog-rewd header .text-desc p {
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