var CheckTools = {
    
    //用户名正则，4到16位（字母，数字，下划线，减号）
    UserNameRegExp: /^[a-zA-Z0-9_-]{4,16}$/,

    //密码强度正则，6-16位，包括至少1个大写字母，1个小写字母
    PasswordRegExp: /^.*(?=.{6,16})(?=.*[A-Z])(?=.*[a-z]).*$/,

    //密码强度正则，6-16位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
    PasswordRegExp_Secure: /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
    
    //Email正则
    EmailRegExp: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    
    //手机号正则
    PhoneNumRegExp: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,

    //url正则
    UrlRegExp_Secure: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,

    //url正则(匹配域名部分)
    UrlRegExp: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:ww‌​w.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?‌​(?:[\w]*))?)/,
    
    //Web安全，CSRF同源检测工具
    AllowDomainCheck: AllowDomainCheck,

    //Web安全，CSRF Token验证工具
    // TokenCheck: TokenCheck,

}

var AllowDomain = {
    Domain_1: 'http://www.hezhang18.cn',
    Domain_2: 'https://www.hezhang18.cn',
    TestDomain_1: 'http://localhost:8080',
    TestDomain_2: 'http://127.0.0.1:8080',
    // TestDomain_3: 'http://localhost:5050',
    // TestDomain_4: 'http://127.0.0.1:5050',
}

function AllowDomainCheck(OriginUrl, RefererUrl){
    //两个来源地址都不存在，或者来其中一个源地址存在但不合法，此时对请求进行拦截
    let CheckRes = [false, false]; 
    
    if(!OriginUrl && !RefererUrl){
        return false;
    }
    
    if(OriginUrl){
        let OriginDomain = OriginUrl;
        for(let key in AllowDomain){
            if(OriginDomain === AllowDomain[key]){
                CheckRes[0] = true;
                break;
            }
        }
    }

    if(RefererUrl){
        let RefererDomain = RefererUrl.match(this.UrlRegExp)[0];
        for(let key in AllowDomain){
            if(RefererDomain === AllowDomain[key]){
                CheckRes[1] = true;
                break;
            }
        }
    }
    
    if((OriginUrl && !CheckRes[0]) || (RefererUrl && !CheckRes[1])){
        return false;
    }

    return true;
}



module.exports = CheckTools;