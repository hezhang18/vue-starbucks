<template>
	<section class="program">
		<div class="wrapper">
			<div class="grid clearfix">
				<div class="program-describe">
					<h2>星享俱乐部</h2>
					<p class="program-detail">
						开启您的星享之旅，星星越多、会员等级越高、好礼越丰富。
						<a href="javascript:;" class="program-more">
							了解更多 ›
						</a>
					</p>
					<p class="account-entry" v-if="!NickName">
						<a href="javascript:;" class="sign-in button btn-bigger" @click="pageRedir(2)">
							<span>登录</span>
						</a>
						<a href="javascript:;" class="register button btn-bigger" @click="pageRedir(4)">
							<span>注册</span>
						</a>
					</p>
				</div>
				<!-- 登录后此处添加.vertical-middle-login保证图片居中，同时上面登录注册按钮隐藏 -->
				<div class="program-image" :class="{'onlogin':NickName}">
					<img src="@/assets/images/logo-msr-new.svg">
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		computed: {
			NickName(){
				return this.$store.state.NickName;
			}
		},
		mounted(){
			
		},
		methods: {
            pageRedir(item){
				this.$store.commit('pageRedir', item);
			}
		}
	}
</script>
