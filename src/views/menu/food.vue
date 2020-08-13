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
									<h2 class="navTitle-menuList">美食</h2>
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
						<div v-for="(menuTag, index) in menuNavFilter" v-show="menuFilter(index)">
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
		name: 'menuFood',
		metaInfo: {
			title: '美食',
			titleTemplate: '%s | 星巴克',
			meta: [
				{
					name: 'keywords',
					content: ''
				},
				{
					name: 'description',
					content: '探索星巴克美食。'
				}
			]
		},
		data(){
			return {
				show_menu_bol: false,
				lgMedia: window.matchMedia('(min-width: 1025px)').matches,
				loading: false,
				foodSortItems: {},
                storage: null,
				curActive: 'all',
				menuNavFilter: [
					{
						menuEN: 'baking',
						menuCN: '烘焙'
					},
					{
						menuEN: 'dessert',
						menuCN: '蛋糕&甜品'
					},
					{
						menuEN: 'sandwich',
						menuCN: '三明治、帕尼尼、卷'
					},
					{
						menuEN: 'yogurt',
						menuCN: '酸奶'
					},
					{
						menuEN: 'other',
						menuCN: '其他美食'
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
				if(storage && storage.foodSortItems && storage.foodSortItems !== []){
					this.foodSortItems = this.getStorageItems({
						storage: storage,
						itemName: 'foodSortItems'
					});
				}else{
					this.getFoodItems();
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
			getFoodItems(){
				this.loading = true;

				axios.get("/food/items").then((res)=>{
					let data = res.data,
						storage = this.storage;

					if(data.status == '1'){
						console.log("Data request failed!");
						return ;
					}

					this.foodSortItems = this.sortItems(data.result.data);
					this.loading = false;

					if(storage){
                        this.setStorageItems({
                            storage: storage,
                            itemName: 'foodSortItems',
                            data: this.foodSortItems
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
				let key = this.menuNavFilter[index].menuEN;
				let list = this.foodSortItems[key];
				if(list !== []){
					this.$store.curMenuList = list;
					return true;
				}else{
					return false;
				}
			},
			isNotLastItem(index){
				if(this.curActive == 'all'){
					return index !== this.menuNavFilter.length - 1;
				}else{
					return false;
				}
			},
			menuFilter(index){
				if(this.curActive == 'all'){
					return true;
				}else{
					return this.curActive == index;
				}
			},
			trackingVisitor() {
				let storage = window.sessionStorage || null;
				if(storage) {
					let VisitorID = storage.getItem('VisitorID'),
						page = '菜单-食品';
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
