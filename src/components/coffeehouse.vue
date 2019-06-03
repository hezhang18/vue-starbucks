<template>
	<section class="coffeehouse">
		<div class="wrapper">
			<h2>1912 派克街 | 咖啡星讲堂</h2>
			<p>了解更多星巴克咖啡文化</p>
		</div>
		<div class="scroll-wrapper">
			<div class="swiper-container">
			    <div class="swiper-wrapper">
			        <a class="swiper-slide transition">
			        	<div class="bg-image coffee-cultivation"></div>
			        	<span>咖啡知识</span>
			        	<p>咖啡的起源于培植</p>
			        </a>
			        <a class="swiper-slide transition">
			        	<div class="bg-image fundamentals"></div>
			        	<span>咖啡品鉴</span>
			        	<p>咖啡调剂</p>
			        </a>
			        <a class="swiper-slide transition">
			        	<div class="bg-image roast-story"></div>
			        	<span>咖啡知识</span>
			        	<p>咖啡烘焙</p>
			        </a>
			        <a class="swiper-slide transition">
			        	<div class="bg-image pour-over"></div>
			        	<span>咖啡品鉴</span>
			        	<p>手冲咖啡</p>
			        </a>
			    </div>
			</div>
		</div>
		<div class="swiper-btn swiper-button-prev transition">
	    	<img src="@/assets/icons/icon-scroll-left.svg">
	    </div>
	    <div class="swiper-btn swiper-button-next transition">
	    	<img src="@/assets/icons/icon-scroll-right.svg">
	    </div>
	</section>
</template>
<script>

	import Swiper from 'swiper';
	import 'swiper/dist/css/swiper.min.css'
	
	export default {
		data(){
			return{

			}
		},
		mounted(){
			this.swiperScrollConfig();
		},
		methods: {
			swiperScrollConfig(){
				let swiper_scroll_ad = new Swiper ('.coffeehouse .swiper-container', {
		
					direction: 'horizontal', 
				    loop: false, 
				    slidesPerView: 'auto',
				    freeMode: true,
				    mousewheel: true,
				    navigation: {
				      nextEl: '.coffeehouse .swiper-button-next',
				      prevEl: '.coffeehouse .swiper-button-prev',
				    },

				});
			}
		}
	}
	
</script>