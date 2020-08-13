<template>
	<div>
		<article class="wrapper" v-bind:class="{greyBgColor:(curActive !== 'all' || loading === true)}">
				<nav class="nav">
					<nav-container v-on:showMenuOverlay="showMenuExec" v-show="!show_menu_bol">
						<span slot="navbody">
							<section class="navbody-menu body">
								<div class="menubtn account">
									<div class="back">
										<a href="javascript:;" @click="pageRedir(3)">
											<img src="@/assets/icons/icon-chevron-left.svg">
											<span>菜单</span>
										</a>
									</div>
									<h2 class="navTitle-menuList">咖啡产品</h2>
									<ul>
										<li @click="curActive = 'all'">
											<a href="javascript:;" :class="{'active-menu':curActive == 'all'}">
												全部
											</a>
										</li>
										<li v-for="(menuBtn, index) in menuNavFilter" @click="curActive = index;">
											<a href="javascript:;" :class="{'active-menu':curActive == index}">
												{{menuBtn.menuCN}}
											</a>
										</li>
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
					<section class="menulist">
						<div v-for="(menuTag, index) in menuListFilter" v-show="menuFilter(index)">
							<h3 class="capation">
								{{menuTag.menuCN}}
							</h3>
							<div class="loading-svg center" v-if="loading">
								<img src="@/assets/loading-svg/loading-bars.svg"/>
							</div>
							<ul class="products" v-if="getCurMenuList(index)">
								<li v-for="item in $store.curMenuList">
									<a href="javascript:;">
										<img :src="'/static/images/products/'+item.ProductImage" alt="">
										<span>{{item.ProductName}}</span>
									</a>
								</li>
							</ul>
							<hr v-if="isNotLastItem(index)"></hr>
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
		name: 'menuCoffee',
		metaInfo: {
			title: '咖啡产品',
			titleTemplate: '%s | 星巴克',
			meta: [
				{
					name: 'keywords',
					content: ''
				},
				{
					name: 'description',
					content: '探索星巴克咖啡产品。'
				}
			]
		},
		data(){
			return {
				show_menu_bol: false,
				lgMedia: window.matchMedia('(min-width: 1025px)').matches,
				loading: false,
				coffeeSortItems: {},
                storage: null,
				curActive: 'all',
				menuNavFilter: [
					{
						menuEN: 'beans',
						menuCN: '咖啡豆'
					},
					{
						menuEN: 'via',
						menuCN: '星巴克VIA® 免煮咖啡'
					},
					{
						menuEN: 'selection',
						menuCN: '星巴克臻选™咖啡'
					},
					{
						menuEN: 'origami',
						menuCN: 'Origami™'
					}
				],
				menuListFilter: [
					{
						menuEN: 'baking-M',
						menuCN: '中度烘焙'
					},
					{
						menuEN: 'baking-D',
						menuCN: '深度烘焙'
					},
					{
						menuEN: 'via-dairy',
						menuCN: 'VIA® DAIRY'
					},
					{
						menuEN: 'via-black',
						menuCN: 'VIA® BLACK'
					},
					{
						menuEN: 'selection',
						menuCN: '星巴克臻选™咖啡'
					},
					{
						menuEN: 'origami-M',
						menuCN: '中度烘焙'
					},
					{
						menuEN: 'origami-D',
						menuCN: '深度烘焙'
					}
				]
			}
		},
		mounted(){
			const _self = this;
			window.matchMedia('(min-width: 1025px)').addListener(()=>{
				_self.lgMedia = window.matchMedia('(min-width: 1025px)').matches;
			});
			this.init();
			this.trackingVisitor();
		},
		components: {
			NavContainer: NavContainer,
			NavOverlay: NavOverlay,
			NavMobile: NavMobile
		},
		methods: {
            init(){
				this.storage = window.sessionStorage || null;
				let storage = this.storage;
				if(storage && storage.coffeeSortItems && storage.coffeeSortItems !== []){
					this.coffeeSortItems = this.getStorageItems({
						storage: storage,
						itemName: 'coffeeSortItems'
					});
				}else{
					this.getCoffeeItems();
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
			getCoffeeItems(){
				this.loading = true;

				axios.get("/coffee/items").then((res)=>{
					let data = res.data,
                        storage = this.storage;

					if(data.status == '1'){
						console.log("Data request failed!");
						return ;
					}

					this.coffeeSortItems = this.sortItems(data.result.data);
					this.loading = false;

                    if(storage){
                        this.setStorageItems({
                            storage: storage,
                            itemName: 'coffeeSortItems',
                            data: this.coffeeSortItems
                        });
                    }
				});
			},
			sortItems(productItems){
				let tempStr = '',
					tempObj = {},
					subTypes = [],
					key = '',len = '';
				productItems.map((item)=>{
					if(item.SubTypes !== tempStr){
						tempStr = item.SubTypes;
						subTypes.push(tempStr);
						len = subTypes.length;
						key = subTypes[len-1];
						tempObj[key] = [];
					}
					tempObj[key].push(item);
				});
				return tempObj;
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
			getCurMenuList(index){
				let key = this.menuListFilter[index].menuEN;
				let list = this.coffeeSortItems[key];
				if(list !== []){
					this.$store.curMenuList = list;
					return true;
				}else{
					return false;
				}
			},
			isNotLastItem(index){
				let curActive = this.curActive;
				if(curActive == 'all'){
					return index !== this.menuListFilter.length - 1;
				}else if(curActive == '0'){
					return (curActive == index) || ((curActive + 1) !== index);
				}else if(curActive == '1'){
					return ((curActive + 1) == index) || ((curActive + 2) !== index);
				}else if(curActive == '2'){
					return ((curActive + 2) !== index);
				}else if(curActive == '3'){
					return ((curActive + 2) == index) || ((curActive + 3) !== index);
				}
			},
			menuFilter(index){
				let curActive = this.curActive;
				if(curActive == 'all'){
					return true;
				}else if(curActive == '0'){
					return (curActive == index) || ((curActive + 1) == index);
				}else if(curActive == '1'){
					return ((curActive + 1) == index) || ((curActive + 2) == index);
				}else if(curActive == '2'){
					return ((curActive + 2) == index);
				}else if(curActive == '3'){
					return ((curActive + 2) == index) || ((curActive + 3) == index);
				}
			},
			trackingVisitor() {
				let storage = window.sessionStorage || null;
				if(storage) {
					let VisitorID = storage.getItem('VisitorID'),
						page = '菜单-咖啡';
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
