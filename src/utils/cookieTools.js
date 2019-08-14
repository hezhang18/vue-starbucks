var CookieTools = {
    
    SetCookie: SetCookie,

    GetCookie: GetCookie,

    DelCookie: DelCookie
    
}

function SetCookie(key, value, expir, path, domain){
    // 1.处理默认保存的路径
    var index = window.location.pathname.lastIndexOf("/")
    var currentPath = window.location.pathname.slice(0, index);
    path = path || currentPath;
    
    // 2.处理默认保存的domain
    domain = domain || document.domain;
   
    // 3.处理默认的过期时间
    if(!expir){
        document.cookie = key+"="+value+";path="+path+";domain="+domain+";";
    }else{
        // expires
        // var date = new Date();
        // date.setDate(date.getDate() + expir);
        // document.cookie = key+"="+value+";expires="+date.toGMTString()+";path="+path+";domain="+domain+";";
        
        // maxAge
        document.cookie = key+"="+value+";Max-Age="+expir+";Path="+path+";Domain="+domain+";";
    }
}

function GetCookie(key){
    var res = document.cookie.split(";");
    
    for(var i = 0; i < res.length; i++){
        var temp = res[i].split("=");

        if(temp[0].trim() === key){
            return temp[1];
        }
    }
}

function DelCookie(key) {
    SetCookie(key, GetCookie(key), -1);
}

export default CookieTools