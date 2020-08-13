<template>
	<div>
		<article class="wrapper">
			<nav class="nav">
				<nav-container v-on:showMenuOverlay="showMenuExec" v-show="!show_menu_bol">
					<span slot="navbody">
						<section class="body">
							<div class="storesList">
								<section class="position">
									<span class="locator-green">
										<img src="@/assets/icons/icon-locator-green.svg">
									</span>
									{{localPosition || '未知地点'}}
									<span class="locator-arrow">
										<img src="@/assets/icons/icon-locator-arrow.svg">
									</span>
								</section>
								<section class="search clearfix">
									<div class="storeSearch">
										<input type="text" placeholder="请输入地址查找门店">
										<img src="@/assets/icons/icon-search.svg">
									</div>
									<div class="storeSelect">筛选</div>
								</section>
								<section class="nearbyStoresList">
									<section class="nearbyStores clearfix" v-for="(item, index) in nearbyStores" @click = "storeClicked(index)" @mouseover = "storeMouseOver(index)" @mouseout = "storeMouseOut(index)" :class="{'storeClicked': clicked === index}">
										<section class="storeLabel">
											<span>{{index + 1}}</span>
											<img src="@//assets/icons/icon-pin-solid-grey.svg">
										</section>
										<section class="storeInfo">
											<div class="storeName">{{item.StoreName}}</div>
											<div class="storeAdd">{{item.StreetAddress}}</div>
											<div class="storeDis">
												{{item.Distance < 1000 ? item.Distance+' m' : (Math.round(item.Distance/100)/10).toFixed(1)+' km'}}
											</div>
										</section>
										<section class="moreInfo">
											<img src="@/assets/icons/icon-info-green.svg">
										</section>
									</section>
									<div class="noStore" v-if="loadingStores">
										<img src="@/assets/loading-svg/loading-bubbles.svg">
									</div>
									<div class="noStore" v-if="!loadingStores && !nearbyStores[0]">找不到门店</div>
								</section>
							</div>
						</section>
					</span>
				</nav-container>
				<nav-overlay v-on:closeMenuOverlay="closeMenuExec" v-show="show_menu_bol">
				</nav-overlay>
				<nav-mobile v-on:showMenuOverlay="showMenuExec"></nav-mobile>
			</nav>
			<section id="sAMap" class="content" v-if="true || lgMedia || !show_menu_bol">
			</section>
		</article>
	</div>
</template>

<script>

	import '@/assets/css/bootstrap.min.css'
	import '@/assets/css/swiper.min.css'
	import '@/assets/css/init.css'
	import '@/assets/css/styles.css'
	import '@/assets/css/stores.css'
	import NavContainer from '@/components/navContainer'
	import NavOverlay from '@/components/NavOverlay'
	import NavMobile from '@/components/navMobile'
	import axios from 'axios'
	import AMap from 'AMap'
	import StoresTools from '@/utils/storesTools'
	
	export default {
		name: 'stores',
		metaInfo: {
			title: '门店查询',
			titleTemplate: '%s | 星巴克',
			meta: [
				{
					name: 'keywords',
					content: ''
				},
				{
					name: 'description',
					content: '查询附近的门店位置、营业时间及联系方式。'
				}
			]
		},
		data(){
			return {
				show_menu_bol: false,
				lgMedia: window.matchMedia('(min-width: 1025px)').matches,
				mbMedia: window.matchMedia('(max-width: 640px)').matches,
				map: null,
				localPosition: '',
				storesList: [],
				nearbyStores: [],
				cityInfo: [],
				markers: [],
				storage: null,
				loadingStores: false,
				clicked: 'None'
			}
		},
		mounted(){
			window.matchMedia('(min-width: 1025px)').addListener(()=>{
				this.lgMedia = window.matchMedia('(min-width: 1025px)').matches;
			});
			window.matchMedia('(max-width: 640px)').addListener(()=>{
				this.mbMedia = window.matchMedia('(max-width: 640px)').matches;
			});
			this.initData();
			this.initMap();
			this.trackingVisitor();
		},
		components: {
			NavContainer: NavContainer,
			NavOverlay: NavOverlay,
			NavMobile: NavMobile
		},
		methods: {
			showMenuExec(){
				this.show_menu_bol = true;
			},
			closeMenuExec(){
				this.show_menu_bol = false;
			},
			initData(){
				this.storage = window.localStorage || null;

				let storage = this.storage;
				if(storage && storage.storesList && storage.storesList !== []){
					this.storesList = this.getStorageItems({
						storage: storage,
						itemName: 'storesList',
						exp: 1000*60*60*24*7
					});

					let sStorage = sessionStorage || null;
					if(sStorage) {
						axios.post('/users/trackDataLoaded', {
							visitorID: sStorage.getItem('VisitorID'),
							dataOrigin:'本地存储'
						})
					}
				}else{
					this.getStoresList();
				}

                this.getCityInfo();
			},
			initMap(){
				// 初始化地图
				this.map = new AMap.Map('sAMap', {
			        resizeEnable: true,
			        zoom:16
			 	});
			 	if(this.mbMedia){
					this.map.setZoom(13);
				}

				// 控件、地理定位、门店列表
				this.addZoomControl();
				this.getLocalPosition();

				// 地图监听
			    this.map.on("moveend", ()=>{
                    setTimeout(()=>{
			      	    this.showNearbyStores();
			        }, 1500);
			    });
			    this.map.on("zoomend", ()=>{
			        setTimeout(()=>{
				        this.showNearbyStores();
				    }, 1500);
			    });
			},
			addZoomControl(){
				AMapUI.loadUI([
					'control/BasicControl'
				],(BasicControl)=>{
					this.map.addControl(new BasicControl.Zoom({
				    	position: {right: '16px', bottom: '48px'},
				    	showZoomNum: false,
				  	}));
				});
			},
			getLocalPosition(){
				AMap.plugin([
					'AMap.Geolocation',
					'AMap.Geocoder'
				], ()=>{
					let geolocation = new AMap.Geolocation({
							enableHighAccuracy: true,
							timeout: 3000,
				            buttonPosition:'RB',
				            buttonOffset: new AMap.Pixel(16, 136),
				            panToLocation: true,
				            zoomToAccuracy: false,
						});
					let geocoder = new AMap.Geocoder();

					this.map.addControl(geolocation);

					geolocation.getCurrentPosition((status, result)=>{
						// 首先获取当前地理位置，如果失败则获取当前城市信息
						if(status == 'complete'){
			                let position = result.position,
			                	lnglat = [position.lng, position.lat];
					  		geocoder.getAddress(lnglat, (status, result)=>{
					  			this.localPosition = StoresTools.ReturnAddress(status, result);
		        			});

					  		this.calcDistance(lnglat);
					  		this.showNearbyStores();
			            }else{
			                geolocation.getCityInfo((status, result)=>{
			                	let lnglat = result.center;
						  		geocoder.getAddress(lnglat, (status, result)=>{
			            			this.localPosition = StoresTools.ReturnAddress(status, result);
			        			});

						  		this.calcDistance(lnglat);
						  		this.showNearbyStores();
			                });
			            }

						if(this.storesList && this.storesList.length !== 0){
							this.loadingStores = false;
						}
					});
				});
			},
			getCityInfo(){
				// 获取门店城市信息
				axios.get("/cityinfo/items").then((res)=>{
					let data = res.data;
					if(data.status == '1'){
						console.log("Data request failed!");
						return ;
					}
					this.cityInfo = data.result.data;
				});
			},
			getStoresList(){
				this.loadingStores = true;

				axios.get("/storelocation/items").then((res)=>{
					let data = res.data,
						storage = this.storage;

					if(data.status == '1'){
						console.log("Data request failed!");
						return ;
					}

					this.storesList = data.result.data;
					this.getLocalPosition();

					if(storage){
						this.setStorageItems({
							storage: storage,
							itemName: 'storesList',
							data: this.storesList
						});
					}

					let sStorage = sessionStorage || null;
					if(sStorage) {
						axios.post('/users/trackDataLoaded', {
							visitorID: sStorage.getItem('VisitorID'),
							dataOrigin:'数据库加载'
						})
					}
				});
			},
			setStorageItems(options){
				let storage = options.storage,
					itemName = options.itemName,
					data = options.data;

				storage.setItem(itemName, JSON.stringify(data));

				if(storage === localStorage){
					let timerName = itemName + '_Timer',
						curTime = new Date().getTime();
        			storage.setItem(timerName, JSON.stringify({time:curTime}));
				}
			},
			getStorageItems(options){
				let storage = options.storage,
					itemName = options.itemName,
					exp = options.exp;

				let timerName = itemName + '_Timer',
					Json = storage.getItem(timerName),
					Timer = JSON.parse(Json),
					createTime = Timer.time,
					curTime = new Date().getTime();

				if(curTime - createTime <= exp){
					let data = storage.getItem(itemName);
					return JSON.parse(data);
				}else{
					storage.removeItem(itemName);
					storage.removeItem(timerName);
					this.getStoresList();
				}
			},
			calcDistance(localLngLat){
				if(this.storesList === undefined){
					return ;
				}

				let len = this.storesList.length;

				for(let i = 0; i < len; i++){
					try{
						let lng = this.storesList[i].Longitude,
							lat = this.storesList[i].Latitude,
							storeLngLat = [lng, lat],
							dis = AMap.GeometryUtil.distance(localLngLat, storeLngLat);
						this.storesList[i].Distance = Math.round(dis);

					}
					catch(err){
						console.log('Error: ' + err, 'Item: ' + JSON.stringify(this.storesList[i]));
					}
				}

				// 按门店距离由近及远重新排序
				this.storesList.sort((a, b)=>{
					let aDis = a.Distance,
						bDis = b.Distance;
					if(aDis > bDis){
						return 1;
					}else if(aDis < bDis){
						return -1;
					}else{
						return 0;
					}
				});
			},
			showNearbyStores(){
				let stores = this.storesList,
					cityInfo = this.cityInfo,
					distance = '',
					zoom = this.map.getZoom();

				if(zoom >= 13){
					StoresTools.SetLocations({
						stores: stores,
						vData: this,
						distance: 0
					});
				}else if(zoom == 12){
					StoresTools.SetLocations({
						stores: stores,
						vData: this,
						distance: 2400
					});
				}else if(zoom == 11){
					StoresTools.SetLocations({
						stores: stores,
						vData: this,
						distance: 16000
					});
				}else if(zoom == 9 || zoom == 10){
					StoresTools.SetLocations({
						stores: stores,
						vData: this,
						distance: 24000
					});
				}else{
					StoresTools.SetCityInfo({
						cityInfo: cityInfo,
						vData: this
					});
				}
			},
			addMarker(lng, lat, label, color){
				AMapUI.loadUI(['overlay/SvgMarker'], (SvgMarker)=>{
					StoresTools.AddSvgMarker({
						lng: lng,
						lat: lat,
						label: label,
						Marker: SvgMarker,
						color: color,
						vData: this
					});
				});
			},
			storeClicked(index){
				// 当前门店信息滑动至顶部，SrollArea所对应的元素应为已经设置overflow:auto;的元素
				let nearbyStores = $('.nearbyStores');

				if(this.lgMedia){
					let lSrollArea = $('.nav-container'),
					    hdHeight = 97,
	                    lStep = nearbyStores[index].offsetTop - hdHeight;
					lSrollArea.animate({scrollTop: lStep}, 240);
				}else{
					let mScrollArea = $('.nearbyStoresList'),
					    mStep = nearbyStores[index].offsetTop;
	                mScrollArea.animate({scrollTop: mStep}, 240);
				}

                // 动态设置门店信息背景颜色
				this.clicked = index;

                // 动态设置地图标记点颜色
				let len = this.markers.length;
				for(let i = 0; i < len; i++){
					let fillColor = StoresTools.GetFillColor({
						item: i,
						vData: this
					});
					if(fillColor === '#00A862'){
						AMapUI.loadUI(['overlay/SvgMarker'], (SvgMarker)=>{
							let shape = new SvgMarker.Shape.WaterDrop({
						        height: 28,
						        width: 21,
						        fillColor: '#B0B0B0'
						    });
						    this.markers[i].setSvgShape(shape);
						});
					}
					
				}
				AMapUI.loadUI(['overlay/SvgMarker'], (SvgMarker)=>{
					let shape = new SvgMarker.Shape.WaterDrop({
				        height: 28,
				        width: 21,
				        fillColor: '#00A862'
				    });

					let newIndex = this.markersDuplic(index) || index;
                    this.markers[newIndex].setSvgShape(shape);

				});
			},
			storeMouseOver(index){
				if(this.clicked === index){
					return ;
				}
				AMapUI.loadUI(['overlay/SvgMarker'], (SvgMarker)=>{
					let shape = new SvgMarker.Shape.WaterDrop({
				        height: 28,
				        width: 21,
				        fillColor: '#00A862'
				    });

				    let newIndex = this.markersDuplic(index) || index;
                    this.markers[newIndex].setSvgShape(shape);
				});
			},
			storeMouseOut(index){
				if(this.clicked === index){
					return ;
				}
				AMapUI.loadUI(['overlay/SvgMarker'], (SvgMarker)=>{
					let shape = new SvgMarker.Shape.WaterDrop({
				        height: 28,
				        width: 21,
				        fillColor: '#B0B0B0'
				    });

				    let newIndex = this.markersDuplic(index) || index;
                    this.markers[newIndex].setSvgShape(shape);
				});
			},
			markersDuplic(index){
                let _self = this,
                    len = _self.markers.length,
                    halfLen = len/2,
                    mLabel = '';

				if(!Number.isInteger(halfLen)){
					return false;
				}

				try{
					mLabel = StoresTools.GetLabel({
						item: halfLen,
						vData: this
					});
				}catch(err){
					console.log(err);
				}

				if(mLabel == '1'){
					let newIndex = halfLen + index;
					return newIndex;
				}
			},
			trackingVisitor() {
				let storage = window.sessionStorage || null;
				if(storage) {
					let VisitorID = storage.getItem('VisitorID'),
						page = '门店';
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
