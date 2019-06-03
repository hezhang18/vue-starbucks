<template>
	<header class="header">
		<a href="javascript:;" class="logo" @click="pageRedir(0)">
			<img src="@/assets/images/logo.svg" alt="星巴克">
		</a>
		<div class="primary-nav">
			<ul>
				<li class="stores">
					<a href="javascript:;" class="stores-primary" @click="pageRedir(1)">门店</a>
				</li>
				<li class="account">
					<a href="javascript:;" class="account-primary" @click="pageRedir(2)">我的账户</a>
				</li>
				<li class="menu">
					<a href="javascript:;" class="menu-primary" @click="pageRedir(3)">菜单</a>
				</li>
			</ul>
		</div>
		<a rel="nav-overlay" class="icon menu-trigger transition" @click="showMenu">
			<img src="@/assets/icons/icon-hamburger.svg" alt="更多">
		</a>
	</header>
</template>
<script>

	export default {
		data(){
			return {

			}
		},
		methods: {
			showMenu(){
				this.$emit("clickedShowMenu");
			},
			pageRedir(item){
				this.$store.commit('pageRedir', item);
			}
		}
	}

</script>
