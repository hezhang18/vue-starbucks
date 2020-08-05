var StoresTools = {

    ReturnAddress: ReturnAddress,

    SetCityInfo: SetCityInfo,

    SetLocations: SetLocations,

    AddSvgMarker: AddSvgMarker,

    GetFillColor: GetFillColor,

    GetLabel: GetLabel
    
}

function ReturnAddress(status, result){
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

function SetCityInfo(options){
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

function SetLocations(options){
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

    /* 
        // 如果当前视图中没有门店，则自动缩小地图级别进行门店展示
        if(vData.nearbyStores.length === 0){
    	    let zoom = vData.map.getZoom();
    	    vData.map.setZoom(--zoom)
        } 
    */
}

function AddSvgMarker(options){
    let lng = options.lng,
        lat = options.lat,
        label = options.label,
        Marker = options.Marker,
        color = options.color,
        vData = options.vData;    
        

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
            map: vData.map,
            position: [lng,lat],
        }
    );
    vData.markers.push(marker);
}

function GetFillColor(options){
    let item = options.item,
        vData = options.vData;
    return vData.markers[item].opts.svgShape.opts.fillColor;
}

function GetLabel(options){
    let item = options.item,
        vData = options.vData;
    return vData.markers[item].opts.iconLabel.innerHTML;
}

export default StoresTools