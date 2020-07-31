<template>
	<article class="nav-container home-page">
		<nav-header v-on:clickedShowMenu="showMenu"></nav-header>
        <slot name="navbody"></slot>
	</article>
</template>
<script>

	import NavHeader from '@/components/navHeader'

	export default {
		data(){
			return {

			}
		},
		components: {
			NavHeader: NavHeader,
		},
		methods: {
			showMenu(){
				this.$emit("showMenuOverlay");
			}
		}
	}

</script>
