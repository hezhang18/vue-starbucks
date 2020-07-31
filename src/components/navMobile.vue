<template>
	<article class="nav-mobile mobile-show tablet-hidden">
		<ul>
			<li>
				<a href="javascript:;" class="nav-mobile-btn homepage-mobile" @click="clickBtn(0)">
					<span class="icons">
						<img src="@/assets/icons/icon-home.svg" v-if="!actives[0]">
						<img src="@/assets/icons/icon-home-active.svg" v-if="actives[0]">
					</span>
					<div v-bind:class="{active: actives[0]}">主页</div>
				</a>
			</li>
			<li>
				<a href="javascript:;" class="nav-mobile-btn stores-mobile" @click="clickBtn(1);">
					<span class="icons">
						<img src="@/assets/icons/icon-stores.svg" v-if="!actives[1]">
						<img src="@/assets/icons/icon-stores-active.svg" v-if="actives[1]">
					</span>
					<div v-bind:class="{active: actives[1]}">门店</div>
				</a>
			</li>
			<li>
				<a href="javascript:;" class="nav-mobile-btn account-mobile" @click="clickBtn(2)">
					<span class="icons">
						<img src="@/assets/icons/icon-account.svg" v-if="!actives[2]">
						<img src="@/assets/icons/icon-account-active.svg" v-if="actives[2]">
					</span>
					<div v-bind:class="{active: actives[2]}">我的账户</div>
				</a>
			</li>
			<li>
				<a href="javascript:;" class="nav-mobile-btn menu-mobile" @click="clickBtn(3)">
					<span class="icons">
						<img src="@/assets/icons/icon-menu.svg" v-if="!actives[3]">
						<img src="@/assets/icons/icon-menu-active.svg" v-if="actives[3]">
					</span>
					<div v-bind:class="{active: actives[3]}">菜单</div>
				</a>
			</li>
			<li>
				<a href="javascript:;" class="nav-mobile-btn more-mobile" @click="clickBtn(4)">
					<span class="icons">
						<img src="@/assets/icons/icon-more.svg" v-if="!actives[4]">
						<img src="@/assets/icons/icon-more-active.svg" v-if="actives[4]">
					</span>
					<div v-bind:class="{active: actives[4]}">更多</div>
				</a>
			</li>
		</ul>
	</article>
</template>
<script>

	export default {
		data(){
			return {
				actives: '',
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init(){
				let curPath = this.$route.matched[0].path,
					pathTag = this.$store.state.path.indexOf(curPath);
				if(curPath === ''){
					pathTag = 0;
				}
				this.$store.commit('mobileNavAct', pathTag);
				this.actives = this.$store.state.actives;
			},
			clickBtn(tag){
				if(tag === 4){
					this.$emit("showMenuOverlay");
				}else{
					this.$store.commit('pageRedir', tag);
					this.$store.commit('mobileNavAct', tag);
					this.actives = this.$store.state.actives;
				}
			}
		}
	}
	
</script>