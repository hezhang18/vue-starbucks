import CookieTools from './cookieTools'

var PageviewTools = {
    
    GetVisitorID: GetVisitorID,
    
    GetTime: GetTime,

    GetScreenInfo: GetScreenInfo,

    ReturnAddress: ReturnAddress,

    GetBrowser: GetBrowser,

    UploadData: UploadData
    
}

function GetVisitorID() {
    return Math.random().toString().substring(2,12);
}

function GetTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let date = now.getDate();
    let hour = now.getHours();
    let minu = now.getMinutes();
    let sec = now.getSeconds();

    month = month + 1;

    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    
    let time = year + "-" + month + "-" + date+ " " + hour + ":" + minu + ":" + sec;
    
    return time;
}

function GetScreenInfo(win) {
    let ow = win.outerWidth,
        oh = win.outerHeight,
        sw = win.screen.width,
        sh = win.screen.height;
    return '屏幕分辨率: ' + sw + ' * ' + sh + '  浏览器视口: ' + ow + ' * ' + oh;
}

function ReturnAddress(status, result) {
    if (status === 'complete' && result.regeocode) {
        let addressComponent = result.regeocode.addressComponent,
            country = addressComponent.country || '',
            province = addressComponent.province || '',
            city = addressComponent.city || '',
            district = addressComponent.district || '',
            township = addressComponent.township || '',
            street = addressComponent.street || '',
            streetNumber = addressComponent.streetNumber || '';
        return country + province + city + district + township + street + streetNumber;
    }else{
        return  '未知位置';
    }
}

function GetBrowser() {
    return navigator.userAgent;
}

function UploadData(opt) {
    opt.axios.post(opt.router, opt.params).then((res)=>{
        let data = res.data;
        if(data.status == '0'){
            let res = data.result;
            if(opt.storage){
                opt.storage.setItem(opt.key, false);
            }
        }
        CookieTools.DelCookie(opt.token);
    })
}

export default PageviewTools