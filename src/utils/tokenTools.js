import CookieTools from './cookieTools'

var TokenTools = {

    TokenGenerate: TokenGenerate,

    TokenSetting: TokenSetting,

}

function TokenGenerate(){
    var randomStr1 = RandomStr(6),
        randomStr2 = RandomStr(9),
        timeStamp = TimeStamp();
    var token = randomStr1 + timeStamp + randomStr2;

    return token; 
}

function RandomStr(len){
    var str = '',
        arr = ['a', '0', 'b', '1', 'c', '2', 'd', '3', 'e', '4',
               'f', '5', 'g', '6', 'h', '7', 'i', '8', 'j', '9',
               'k', 'l', 'm', 'n', 'o', 'p', '0', 'q', '1', 'r', 
               '2', 's', '3', 't', '4', 'u', '5', 'v', '6', 'w', 
               '7', 'x', '8', 'y', '9', 'z'];
               
    for(let i = 0; i < len; i++){
        var pos = Math.round(Math.random()*(arr.length - 1));
        str += arr[pos];
    }

    return str;
}

function TimeStamp(){
    return new Date().getTime().toString();
}

function TokenSetting(CookieName){
    var token = CookieTools.GetCookie(CookieName);

    if(token){
        CookieTools.DelCookie(CookieName);
    }

    token = TokenTools.TokenGenerate();
    CookieTools.SetCookie(CookieName, token);
    
    return token;
}

export default TokenTools