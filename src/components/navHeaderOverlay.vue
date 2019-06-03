<template>
	<header class="header">
		<a href="javascript:;" class="logo">
			<img src="@/assets/images/logo.svg" alt="星巴克" @click="pageRedir(0)">
		</a>
		<a class="icon close transition">
			<img src="@/assets/icons/icon-close.svg" alt="关闭" @click="closeMenu">
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
			closeMenu(){
				this.$emit("clickedCloseMenu");
			},
			pageRedir(item){
				this.$store.commit('pageRedir', item);
			}
		}
	}

</script>