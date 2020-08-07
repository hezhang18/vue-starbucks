<template>
    <div>
        <article class="pv-wrapper">
            <article class="inner-wrapper clearfix">
                <h1 class="pv-title">网站访问记录</h1>
                <h2 v-show="ready" class="pv-num">访问统计：<span>{{PageViews}}</span></h2>
                <h2 v-show="ready" class="pv-listTitle">访客列表：</h2>
                <section v-for="(item, index) in VisitorInfo" class="pv-list">
                    <p class="pv-visitorNum">
                        序号 - <span v-if="index < 9">0</span>{{index + 1}}
                    </p>
                    <p class="pv-infoTitle">
                        访客信息：
                    </p>
                    <ul class="pv-info">
                        <li v-show="item.VisitorID">
                            <span class="pv-th">访客 ID：</span>{{item.VisitorID}}
                        </li>
                        <li v-show="item.IP">
                            <span class="pv-th">IP 地址：</span>{{item.IP}}
                        </li>
                        <li v-show="item.VisitTime">
                            <span class="pv-th">访问时间：</span>{{item.VisitTime}}
                        </li>
                        <li v-show="item.Location">
                            <span class="pv-th">访客地址：</span>{{item.Location}}
                        </li>
                        <li v-show="item.Screen">
                            <span class="pv-th">屏幕尺寸：</span>{{item.Screen}}
                        </li>
                        <li v-show="item.Device">
                            <span class="pv-th">设备信息：</span>{{item.Device}}
                        </li>
                    </ul>
                    <section v-show="item.BrowseRecord" class="pv-detail">
                        <p class="pv-infoTitle"> 浏览详情：</p>
                        <div v-for="data in item.BrowseRecord">
                            <span class="pv-th">{{data.Page}}：</span>{{data.BrowseTime}}
                        </div>
                    </section>
                    <section v-show="item.StoresDataLoaded.length != 0" class="pv-dataLoad">
                        <p class="pv-infoTitle"> 数据加载：</p>
                        <div v-for="data in item.StoresDataLoaded">
                            <span class="pv-th">{{data.DataOrigin || '无记录'}}：</span>{{data.LoadTime || '无记录'}}
                        </div>
                    </section>
                    <section v-show="item.Login.length != 0" class="pv-login">
                        <p class="pv-infoTitle"> 登录记录：</p>
                        <div v-for="data in item.Login">
                            {{data.LoginTime || '无记录'}} 
                        </div>
                    </section>
                    <section v-show="item.Logout.length != 0" class="pv-logout">
                        <p class="pv-infoTitle"> 登出记录：</p>
                        <div v-for="data in item.Logout">
                            {{data.LogoutTime || '无记录'}} 
                        </div>
                        {{item.logout}}
                    </section>
                </section>
            </article>
        </article>
    </div>
</template>
<style>
    .clearfix::after {
        content: '';
        display: table;
        clear: both;
    }
    .pv-wrapper {
        width: 100%;
        min-height: 100vh;
        padding: 0 24px;
        font-size: 10px;
    }
    .pv-wrapper .inner-wrapper {
        width: 72%;
        min-width: 320px;
        margin: 0 auto;
    }
    .pv-wrapper .pv-title {
        width: 100%;
        margin: 24px 0;
        text-align: center;
        font-size: 2.6em;
        color: #00A862;
        font-weight: 700%;
        line-height: 140%;
    }
    .pv-wrapper .pv-num {
        position: relative;
        margin: 36px 0;
        font-size: 2.0em;
        color: #00A862;
    }
    .pv-num span {
        font-size: 1.6em;
        font-weight: bold;
        font-family: "Gothma-Medium"
    }
    .pv-wrapper .pv-listTitle {
        margin: 24px 0 0;
        font-size: 2.0em;
        color: #00A862;
        border-bottom: 1px solid #00A862;
        padding-bottom: 12px;
    }
    .pv-wrapper .pv-list {
        margin: 12px 0;
        font-size: 1.6em;
        color: rgba(0, 0, 0, 0.72);
        line-height: 140%;
        border-bottom: 1px solid #00A862;
        padding-bottom: 12px;
    }
    .pv-wrapper .pv-visitorNum {
        height: 28px;
        line-height: 28px;
        margin-bottom: 6px;
        padding-right: 6px;
        background-color: #00A862;
        color: #fff;
        text-indent: 3px;
    }
    .pv-wrapper .pv-infoTitle{
        margin-bottom: 6px;
        color: #00A862;
        font-weight: 700;
        opacity: .78;
    }
    .pv-wrapper .pv-info li{
       margin: 6px 0;
       text-indent: 2em;
       color: rgba(0, 0, 0, 0.8);
       line-height: 160%;
    }
    .pv-wrapper .pv-th {
        color: #00A862;
        opacity: .8;
        text-indent: 2em;
    }
    .pv-detail div,
    .pv-login div, 
    .pv-logout div, 
    .pv-dataLoad div {
        text-indent: 2em;
        margin:6px 0;
    }
</style>
<script>
    import axios from 'axios'

    export default {
        data(){
            return {
                ready: false,
                PageViews:'',
                VisitorInfo: null
            }
        },
        mounted(){
            this.getPVRecord()
        },
        methods: {
            getPVRecord(){
                axios.get('/users/pvrecord').then((res)=>{
                    let data = res.data;
                    if(data.status === 0) {
                        let result = data.result;
                        this.PageViews = result.length;
                        this.VisitorInfo = Array.prototype.reverse.call(result);
                        this.ready = true;
                    }

                })
            }
        }
    }

</script>
