<template>
	<section class="slider-ad">
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="item in sliderList">
					<a href="javascript:;">
						<img :src="'/static/images/featured/2019spring/'+ item.sliderImage"
						class="tablet-show mobile-hidden">
						<img :src="'/static/images/featured/2019spring/'+ item.sliderImageMobile"
						class="tablet-hidden mobile-show">
					</a>
				</div>
			</div>
		    <div class="swiper-button-next transition"></div>
		</div>
	</section>
</template>
<script>

	import Swiper from 'swiper';
	import 'swiper/dist/css/swiper.min.css'

	export default {
		data(){
			return{
				sliderList: [
					{
						sliderImage: 'banner-1.jpg',
						sliderImageMobile: 'banner-1-mobile.jpg'
					},
					{
						sliderImage: 'kv-1.jpg',
						sliderImageMobile: 'kv-1-mobile.jpg'
					},
					{
						sliderImage: 'kv-cold-brew.jpg',
						sliderImageMobile: 'kv-cold-brew-mobile.jpg'
					},
					{
						sliderImage: 'kv-2.jpg',
						sliderImageMobile: 'kv-2-mobile.jpg'
					},
					{
						sliderImage: 'kv-5-icecream.jpg',
						sliderImageMobile: 'kv-5-icecream-mobile.jpg'
					},
					{
						sliderImage: 'kv-ice.jpg',
						sliderImageMobile: 'kv-ice-mobile.jpg'
					}
				]
			}
		},
		mounted(){
			 this.swiperSlideConfig();
		},
		methods: {
			swiperSlideConfig(){
				let swiper_slider_ad = new Swiper ('.slider-ad .swiper-container', {

			    	direction: 'horizontal',
			    	loop: true,
			    	speed: 800,
			    	autoplay: {
			    		delay: 3600,
			   	 		stopOnLastSlide: false,
			    		disableOnInteraction: false,
			    	},
			    	navigation: {
			      		nextEl: '.swiper-button-next',
			    	},

			  	});

			  	swiper_slider_ad.el.onmouseover = function(){
			  		swiper_slider_ad.autoplay.stop();
				};

				swiper_slider_ad.el.onmouseout = function(){
			  		swiper_slider_ad.autoplay.start();
				};

				$('.slider-ad .swiper-button-next').click(()=>{
					swiper_slider_ad.autoplay.start();
				});
			}
		}
	}

</script>
