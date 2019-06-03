<template>
	<article class="nav-overlay menu-page">
		<div class="nav-container">
			<nav-header-overlay v-on:clickedCloseMenu="closeMenu"></nav-header-overlay>
			<nav-body-overlay></nav-body-overlay>
			<nav-footer-overlay></nav-footer-overlay>
		</div>
	</article>
</template>
<script>

	import NavHeaderOverlay from '@/components/navHeaderOverlay'
	import NavBodyOverlay from '@/components/navBodyOverlay'
	import NavFooterOverlay from '@/components/navFooterOverlay'

	export default {
		data(){
			return {

			}
		},
		components: {
			NavHeaderOverlay: NavHeaderOverlay,
			NavBodyOverlay: NavBodyOverlay,
			NavFooterOverlay: NavFooterOverlay
		},
		methods: {
			closeMenu(){
				this.$emit("closeMenuOverlay");
			}
		}
	}
</script>