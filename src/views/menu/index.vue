<template>
	<div>
		<article class="wrapper">
				<nav class="nav">
					<nav-container v-on:showMenuOverlay="showMenuExec" v-show="!show_menu_bol">
						<span slot="navbody">
							<section class="navbody-menu body">
								<div class="menubtn account">
									<h2 class="navTitle-menuIndex">菜单</h2>
									<ul>
										<li><a href="javascript:;" class="active-menu" @click="pageRedir(3)">季度精选</a></li>
										<li><a href="javascript:;" @click="pageRedir(9)">饮料</a></li>
										<li><a href="javascript:;" @click="pageRedir(10)">美食</a></li>
										<li><a href="javascript:;" @click="pageRedir(11)">咖啡产品</a></li>
										<li><a href="javascript:;" @click="pageRedir(12)">商品</a></li>
									</ul>
								</div>
							</section>
						</span>
					</nav-container>
					<nav-overlay v-on:closeMenuOverlay="closeMenuExec" v-show="show_menu_bol">
					</nav-overlay>
					<nav-mobile v-on:showMenuOverlay="showMenuExec"></nav-mobile>
				</nav>
				<section class="content" v-if="lgMedia || !show_menu_bol">
					<div class="tag-ad">广告</div>
					<section class="hero">
						<div class="description images">
							<a href="#lto-items">
								<img src="/static/images/featured/2019spring/banner-1.jpg" class="tablet-show mobile-hidden">
								<img src="/static/images/featured/2019spring/banner-1-mobile.jpg" class="tablet-hidden mobile-show">
							</a>
						</div>
						<div class="description text">
							<h2>星巴克玩味冰调™，开启轻盈一夏</h2>
							<p>这一季，我们带着探索与发现的好奇心，来一场视觉与味觉的双重碰撞。</p>
							<p>玩味冰调作为今夏全新的产品品类登场，</p>
							<p>以鸡尾酒为灵感，突破茶与咖啡的传统定义，精心调制出富于层次感的全新饮品。零脂、真材实料、不添加化学合成色素和甜味剂，满足身为潮人的你,对“美味”和“零负担”的双重标准。</p>
						</div>
					</section>
					<section class="featured-items">
						<ul>
							<li class="items" v-for="item in adItems">
								<div class="description images">
									<a href="#lto-items">
										<img :src="'/static/images/featured/2019spring/'+item.adImage" class="tablet-show mobile-hidden">
										<img :src="'/static/images/featured/2019spring/'+item.adImageMobile" class="tablet-hidden mobile-show">
									</a>
								</div>
								<div class="description text">
									<h2>{{item.adTitle}}</h2>
									<p v-for="text in item.adText.split('|')">
										{{text}}
									</p>
								</div>
							</li>
						</ul>
					</section>
					<section id="lto-items" class="lto-items">
						<div class="wrapper clearfix">
							<h2>所有新品</h2>
							<ul>
								<li v-for="(item, index) in productItems">
									<img v-lazy="'/static/images/featured/2019spring/' + item.ProductImage" />
									<p> {{item.ProductName}} </p>
								</li>
							</ul>
						</div>
						<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="36" class="loading-svg mbMedia-loadmore">
							<img src="@/assets/loading-svg/loading-bubbles.svg" :class="{'hidden': hidden}" />
						</div>
					</section>
				</section>
		</article>
    </div>
</template>

<script>

	import '@/assets/css/bootstrap.min.css'
	import '@/assets/css/init.css'
	import '@/assets/css/styles.css'
	import '@/assets/css/menu.css'
	import NavContainer from '@/components/navContainer'
	import NavOverlay from '@/components/NavOverlay'
	import NavMobile from '@/components/navMobile'
	import axios from 'axios'
	
	export default {
		name: 'menuIndex',
		metaInfo: {
			title: '季度精选 - 饮品、食物、咖啡豆、杯子、星享卡和礼物',
			titleTemplate: '%s | 星巴克',
			meta: [
				{
					name: 'keywords',
					content: ''
				},
				{
					name: 'description',
					content: '发现星巴克限时饮品、当季食物、咖啡豆、杯子、星享卡和星礼卡。'
				}
			]
		},
		data(){
			return {
				show_menu_bol: false,
				lgMedia: window.matchMedia('(min-width: 1025px)').matches,
				adItems: [
					{
						adImage: 'featured-2.jpg',
						adImageMobile: 'featured-2-mobile.jpg',
						adTitle: '一口轻盈 一口夏天',
						adText: '全新星轻盈系列，蛋糕也可以清爽一夏无负担。 | 采用风味酸奶为原料，搭配大颗真实果粒，清新轻甜，满足想吃甜点的小心思 | 新口味“茶瓦纳桃桃千层蛋糕”轻甜的奶油融入白桃果肉，不但丰富了口感，更让桃子风味在口中久久留香，满满的初夏味道。'
					},
					{
						adImage: 'banner-3.jpg',
						adImageMobile: 'banner-3-mobile.jpg',
						adTitle: '冰沁一夏好时光',
						adText: '延续星巴克冰杯的外形，不同的水果亮片漂浮在卡片内部，动静之间炫彩缤纷，宛如一杯新鲜果味冰饮一般。内置芯片，可以直接刷卡消费。 | 人鱼系列作为纪念款，延续该系列的设计，| 配合夏季的主题采用以海蓝色为主基调，辅以海底的美妙景色带来阵阵夏日凉意。随机赠送美型胶带印章挂件，共三款可选。'
					},
					{
						adImage: 'banner-6.jpg',
						adImageMobile: 'banner-6-mobile.jpg',
						adTitle: '邂逅夏威夷',
						adText: '夏季限定系列，拼配了稀有而珍贵的夏威夷产区咖啡豆，浓郁的夏威夷热带风情设计，一口仿佛置身海洋，清凉而舒爽。独特焦糖般甘甜和果仁般风味的咖啡豆与非洲及拉美地区的咖啡豆拼配，形成了这款口感顺滑而又优雅的深度烘焙咖啡。'
					},
					{
						adImage: 'featured-5.jpg',
						adImageMobile: 'featured-5-mobile.jpg',
						adTitle: '温暖你的午餐时光',
						adText: '经典烟熏鸡胸肉沙拉及法式秘制烤鸭腿沙拉，保持营养均衡的同时还能满足大口吃肉的双重享受。可加热的主食部分，既能温暖你的胃又不失美味。'
					},
					{
						adImage: 'featured-6.jpg',
						adImageMobile: 'featured-6-mobile.jpg',
						adTitle: '唤醒春意',
						adText: '潜底逐光会员星礼包，卡面设计将海水的湛蓝与春天的新绿结合，带来春天的清新感受。唤醒春意会员星礼包，让一杯咖啡叩开春天的大门，把所有温暖的节奏带到你的生活中。'
					},
					{
						adImage: 'kv-reserve.jpg',
						adImageMobile: 'kv-reserve.jpg',
						adTitle: '全新单一产地咖啡豆',
						adText: '首款来自萨尔瓦多产区的核心单一产区咖啡，在这片神奇的土地上，咖啡农用他们娴熟的手艺孕育出令人难忘的、散发出馥郁果香的咖啡。香甜柑橘般的风味伴随着淡淡牛奶巧克力的风味，在春日的午后为自己煮上一杯，享受来自春日的美好礼赞。'
					}
				],
				productItems: [],
				storage: null,
				page: 1,
				pageSize: 12,
				busy: true,
				hidden: false
			}
		},
		mounted(){
			const _self = this;
			window.matchMedia('(min-width: 1025px)').addListener(()=>{
				_self.lgMedia = window.matchMedia('(min-width: 1025px)').matches;
			});

			_self.init();
			this.trackingVisitor();
		},
		components: {
			NavContainer: NavContainer,
			NavOverlay: NavOverlay,
			NavMobile: NavMobile
		},
		methods: {
			init(){
				// 如果本地存在要获取的数据，则一次性加载所有本地数据同时监听scroll并禁用loadMore。否则，与loadMore配合，向服务器分页请求数据，待所有数据请求完毕统一存储至本地。
				this.storage = window.sessionStorage || null;
				let storage = this.storage;
				if(storage && storage.productItems && storage.productItems !== []){
					this.busy = true;
					this.hidden = true;

					this.productItems = this.getStorageItems({
						storage: storage,
						itemName: 'productItems'
					});

					this.autoScroll();
				}else{
					this.getProductItems();
				}
			},
			showMenuExec(){
				this.show_menu_bol = true;
			},
			closeMenuExec(){
				this.show_menu_bol = false;
			},
			pageRedir(item){
				this.$store.commit('pageRedir', item);
			},
			loadMore(){
				this.busy = true;
				setTimeout(()=>{
                    this.page++;
                    this.getProductItems();
				}, 240);
			},
			getProductItems(){
				let _self = this;
                let params = {
                	page: _self.page,
                	pageSize: _self.pageSize
                }
				axios.get("/selection/items", {
					params: params
				}).then((res)=>{
					let data = res.data;
					if(data.status == '1'){
						console.log("Data request failed!");
						return ;
					}
					_self.productItems = _self.productItems.concat(data.result.data);
					if(data.result.count < 12){
						_self.busy = true;
						_self.hidden = true;
						let storage = _self.storage;
						if(storage){
							_self.setStorageItems({
								storage: storage,
								itemName: 'productItems',
								data: _self.productItems
							});
						}
					}else{
						_self.busy = false;
					}
				});
			},
            setStorageItems(options){
				let storage = options.storage,
					itemName = options.itemName,
					json = options.data;
				storage.setItem(itemName, JSON.stringify(json));
			},
			getStorageItems(options){
				let storage = options.storage,
					itemName = options.itemName,
					json = storage.getItem(itemName);
				return JSON.parse(json);
			},
			autoScroll(){
				let scrollEnd_Timer = null,
					autoScroll_Timer = null,
					start = 0, end = 0;

				$(window).scroll(()=>{
					clearTimeout(scrollEnd_Timer);
					clearTimeout(autoScroll_Timer);
					start = $(window).scrollTop();
					scrollEnd_Timer = setTimeout(scrollEnd, 600);
				});

				$('.content').mousemove(()=>{
					$('html').stop();
				});

				//首先判断手动scroll是否结束，如果结束则触发自动scroll事件
				function scrollEnd(){
					let end = $(window).scrollTop();
					if(end === start && end >= 3446){
						autoScroll_Timer = setTimeout(autoScroll, 20000);
					}
				}

				function autoScroll(){
					let scrollTop = $(window).scrollTop(),
						percent = (9804 - scrollTop)/(9804 - 3446),
						speed = 180000*percent;
					$('html').animate({scrollTop: 9804}, speed, 'linear');

					let scrolling = $('html').is(':animated');
                    if(!scrolling){
						$(window).unbind('scroll');
                    }
				}
			},
			trackingVisitor() {
				let storage = window.sessionStorage || null;
				if(storage) {
					let VisitorID = storage.getItem('VisitorID'),
						page = '菜单-季度精选';
					if(!VisitorID) return;
					axios.post('users/tracking',{
						visitorID: VisitorID,
						page: page
					})
				}
				
			}
		}
	}

</script>
