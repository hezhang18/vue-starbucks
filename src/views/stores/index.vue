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
			const _self = this;
			window.matchMedia('(min-width: 1025px)').addListener(()=>{
				_self.lgMedia = window.matchMedia('(min-width: 1025px)').matches;
			});
			_self.initData();
			_self.initMap();
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
				}else{
					this.getStoresList();
				}

                this.getCityInfo();
			},
			initMap(){
				let _self = this;

				// 初始化地图
				_self.map = new AMap.Map('sAMap', {
			        resizeEnable: true,
			        zoom:16
			 	});

				// 控件、地理定位、门店列表
				_self.addZoomControl();
				_self.getLocalPosition();

				// 地图监听
			    _self.map.on("moveend", function(){
                    setTimeout(()=>{
			      	    _self.showNearbyStores();
			        }, 1500);
			    });
			     _self.map.on("zoomend", function(){
			        setTimeout(()=>{
				        _self.showNearbyStores();
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
				let _self = this;
				AMap.plugin([
					'AMap.Geolocation',
					'AMap.Geocoder'
				], ()=>{
					let geolocation = new AMap.Geolocation({
							enableHighAccuracy: true,
				            timeout: 6000,
				            buttonPosition:'RB',
				            buttonOffset: new AMap.Pixel(16, 136),
				            panToLocation: true,
				            zoomToAccuracy: false,
						});
					let geocoder = new AMap.Geocoder();

					_self.map.addControl(geolocation);

					geolocation.getCurrentPosition((status, result)=>{
						// 首先获取当前地理位置，如果失败则获取当前城市信息
						if(status == 'complete'){
			                let position = result.position,
			                	lnglat = [position.lng, position.lat];
					  		geocoder.getAddress(lnglat, (status, result)=>{
					  			_self.localPosition = returnAddress(status, result);
		        			});

					  		_self.calcDistance(lnglat);
					  		_self.showNearbyStores();
			            }else{
			                geolocation.getCityInfo((status, result)=>{
			                	let lnglat = result.center;
						  		geocoder.getAddress(lnglat, (status, result)=>{
			            			_self.localPosition = returnAddress(status, result);
			        			});

						  		_self.calcDistance(lnglat);
						  		_self.showNearbyStores();
			                });
			            }

						if(_self.storesList && _self.storesList.length !== 0){
							_self.loadingStores = false;
						}
					});
				});

				function returnAddress(status, result){
					if (status === 'complete' && result.regeocode) {
	        			let addressComponent = result.regeocode.addressComponent,
	        				province = addressComponent.province,
	        				city = addressComponent.city,
	        				district = addressComponent.district;
	        			return province + ' ' + city + ' ' + district;
	    			}else{
	    				return  '未知位置';
	    			}
				}
			},
			getCityInfo(){
				// 获取门店城市信息
				let _self = this;
				axios.get("/cityinfo/items").then((res)=>{
					let data = res.data;
					if(data.status == '1'){
						console.log("Data request failed!");
						return ;
					}
					_self.cityInfo = data.result.data;
				});
			},
			getStoresList(){
				let _self = this;
				_self.loadingStores = true;

				axios.get("/storelocation/items").then((res)=>{
					let data = res.data,
						storage = _self.storage;

					if(data.status == '1'){
						console.log("Data request failed!");
						return ;
					}

					_self.storesList = data.result.data;
					_self.getLocalPosition();

					if(storage){
						_self.setStorageItems({
							storage: storage,
							itemName: 'storesList',
							data: _self.storesList
						});
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

				let _self = this,
					len = _self.storesList.length;

				for(let i = 0; i < len; i++){
					try{
						let lng = _self.storesList[i].Longitude,
							lat = _self.storesList[i].Latitude,
							storeLngLat = [lng, lat],
							dis = AMap.GeometryUtil.distance(localLngLat, storeLngLat);
						_self.storesList[i].Distance = Math.round(dis);

					}
					catch(err){
						console.log('Error: ' + err, 'Item: ' + JSON.stringify(_self.storesList[i]));
					}
				}

				// 按门店距离由近及远重新排序
				_self.storesList.sort((a, b)=>{
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
				let _self = this,
					stores = _self.storesList,
					cityInfo = _self.cityInfo,
					distance = '',
					zoom = _self.map.getZoom();

				if(zoom >= 13){
					setLocations({
						stores: stores,
						vData: _self,
						distance: 0
					});
				}else if(zoom == 12){
					setLocations({
						stores: stores,
						vData: _self,
						distance: 2400
					});
				}else if(zoom == 11){
					setLocations({
						stores: stores,
						vData: _self,
						distance: 16000
					});
				}else if(zoom == 9 || zoom == 10){
					setLocations({
						stores: stores,
						vData: _self,
						distance: 24000
					});
				}else{
					setCityInfo({
						cityInfo: cityInfo,
						vData: _self
					});
				}

				function setCityInfo(options){
					// 展示各个城市的门店数量
					let cityInfo = options.cityInfo,
						vData = options.vData,
						bounds = vData.map.getBounds();

					if(cityInfo === undefined){
						return ;
					}

					vData.map.remove(vData.markers);
					vData.nearbyStores = [];
					vData.markers = [];

					for(let i = 0; i < cityInfo.length; i++){
						let lng = parseFloat(cityInfo[i].CenterLon),
							lat = parseFloat(cityInfo[i].CenterLat),
							lnglat = [lng, lat],
							label = cityInfo[i].StoreNum;
						if(bounds.contains(lnglat)){
							vData.addMarker(lng, lat, label, '#00A862');
						}
					}
				}

				function setLocations(options){
					let stores = options.stores,
						vData = options.vData,
						disLeval = options.distance;

					if(stores === undefined){
						return ;
					}

					let len = stores.length,
						label = 0,
						bounds = vData.map.getBounds();

					vData.map.remove(vData.markers);
					vData.nearbyStores = [];
					vData.markers = [];

					for(let i = 0; i < len; i++){
						try{
							let lng = parseFloat(stores[i].Longitude),
								lat = parseFloat(stores[i].Latitude),
								dis = stores[i].Distance,
								lnglat = [lng, lat];
							if(bounds.contains(lnglat) && dis >= disLeval){
								label += 1;
								vData.nearbyStores.push(stores[i]);
								vData.addMarker(lng, lat, label, '#B0B0B0');
								if(label === 90){
									break;
								}
							}
						}
						catch(err){
							console.log('Error: ' + err, 'Item: ' + JSON.stringify(stores[i]));
						}
					}

					// 如果当前视图中没有门店，则自动缩小地图级别进行门店展示
					// if(vData.nearbyStores.length === 0){
					// 	let zoom = vData.map.getZoom();
					// 	vData.map.setZoom(--zoom)
					// }
				}
			},
			addMarker(lng, lat, label, color){
				let _self = this;

				AMapUI.loadUI(['overlay/SvgMarker'], (SvgMarker)=>{
					addSvgMarker(lng, lat, label, SvgMarker);
				});

				function addSvgMarker(lng, lat, label, Marker){
				    let shape = new Marker.Shape.WaterDrop({
				        height: 28,
				        width: 21,
				        fillColor: color
				    });
				    let marker = new Marker(
				        shape,
				        {
				            showPositionPoint: false,
				            iconLabel: {
					            innerHTML: label,
					            style: {
					                color: '#fff'
					            }
					        },
					        containerClassNames: 'my-font-style',
				            map: _self.map,
				            position: [lng,lat],
				        }
				    );
				    _self.markers.push(marker);
				}
			},
			storeClicked(index){
                let _self = this;

				// 当前门店信息滑动至顶部，SrollArea所对应的元素应为已经设置overflow:auto;的元素
				let nearbyStores = $('.nearbyStores');

				if(_self.lgMedia){
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
				_self.clicked = index;

                // 动态设置地图标记点颜色
				let len = _self.markers.length;
				for(let i = 0; i < len; i++){
					let fillColor = getFillColor(i);
					if(fillColor === '#00A862'){
						AMapUI.loadUI(['overlay/SvgMarker'], (SvgMarker)=>{
							let shape = new SvgMarker.Shape.WaterDrop({
						        height: 28,
						        width: 21,
						        fillColor: '#B0B0B0'
						    });
						    _self.markers[i].setSvgShape(shape);
						});
					}
				}
				AMapUI.loadUI(['overlay/SvgMarker'], (SvgMarker)=>{
					let shape = new SvgMarker.Shape.WaterDrop({
				        height: 28,
				        width: 21,
				        fillColor: '#00A862'
				    });

					let newIndex = _self.markersDuplic(index) || index;
                    _self.markers[newIndex].setSvgShape(shape);

				});
				function getFillColor(item){
					return _self.markers[item].opts.svgShape.opts.fillColor;
				}
			},
			storeMouseOver(index){
				let _self = this;
				if(_self.clicked === index){
					return ;
				}
				AMapUI.loadUI(['overlay/SvgMarker'], (SvgMarker)=>{
					let shape = new SvgMarker.Shape.WaterDrop({
				        height: 28,
				        width: 21,
				        fillColor: '#00A862'
				    });

				    let newIndex = _self.markersDuplic(index) || index;
                    _self.markers[newIndex].setSvgShape(shape);
				});
			},
			storeMouseOut(index){
				let _self = this;
				if(_self.clicked === index){
					return ;
				}
				AMapUI.loadUI(['overlay/SvgMarker'], (SvgMarker)=>{
					let shape = new SvgMarker.Shape.WaterDrop({
				        height: 28,
				        width: 21,
				        fillColor: '#B0B0B0'
				    });

				    let newIndex = _self.markersDuplic(index) || index;
                    _self.markers[newIndex].setSvgShape(shape);
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

				try{mLabel = getLabel(halfLen);}catch(err){console.log(err)}

				if(mLabel == '1'){
					let newIndex = halfLen + index;
					return newIndex;
				}

				function getLabel(item){
					return _self.markers[item].opts.iconLabel.innerHTML;
				}
			}
		}
	}

</script>
