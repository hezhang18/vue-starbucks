import CookieTools from './cookieTools'

var PageviewTools = {
    
    GetBrowser: GetBrowser,

    GetTime: GetTime,

    ReturnAddress: ReturnAddress,

    UploadData: UploadData
    
}

function GetBrowser() {
    let ua = navigator.userAgent;

    if(/chrome/i.test(ua)) {
        return 'Chrome';
    }else if(/safari/i.test(ua)){
        return 'Safari';
    }else if(/firefox/i.test(ua)) {
        return 'Firefox';
    }else if(/msie/i.test(ua)) {
        return 'IE8 - IE10';
    }else if("ActiveXObject" in window) {
        return 'IE11';
    }else if(/opera/i.test(ua)){
        return 'Opera';
    }else{
        return 'Other Browser';
    }
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

function ReturnAddress(status, result) {
    if (status === 'complete' && result.regeocode) {
        let addressComponent = result.regeocode.addressComponent,
            country = addressComponent.country,
            province = addressComponent.province,
            city = addressComponent.city,
            district = addressComponent.district,
            street = addressComponent.street,
            streetNumber = addressComponent.streetNumber;
        return country + province + city + district + street + streetNumber;
    }else{
        return  '未知位置';
    }
}

function UploadData(opt) {
    opt.axios.post(opt.router, opt.params).then((res)=>{
        let data = res.data;
        if(data.status == '0'){
            let res = data.result;
        }
        CookieTools.DelCookie(opt.token);
    })
}

export default PageviewTools