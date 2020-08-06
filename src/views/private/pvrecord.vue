<template>
    <div>
        <article class="pv-wrapper">
            <article class="inner-wrapper clearfix">
                <h1 class="pv-title">网站访客信息记录</h1>
                <h2 class="pv-num">网站访问量：{{PageViews}}</h2>
                <h2 class="pv-listTitle">访客列表：</h2>
                <section v-for="(item, index) in VisitorInfo" class="pv-list">
                    <p class="pv-infoTitle">
                        访客编号：<span v-if="index < 9">0</span>{{index + 1}}
                    </p>
                    <ul class="pv-info">
                        <li>IP 地址：{{item.IP}}</li>
                        <li>访问时间：{{item.Time}}</li>
                        <li>访客地址：{{item.Location}}</li>
                        <li v-if="item.Device">屏幕尺寸：{{item.Device}}</li>
                        <li>设备信息：{{item.Browser}}</li>
                    </ul>
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
        /* background-color: rgba(0, 0, 0, 0.12); */
        font-size: 10px;
    }
    .pv-wrapper .inner-wrapper {
        width: 72%;
        min-width: 296px;
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
        margin: 24px 0;
        font-size: 2.0em;
        color: #00A862;
    }
    .pv-wrapper .pv-listTitle {
        margin: 24px 0 12px;
        font-size: 1.6em;
        color: #00A862;
    }
    .pv-wrapper .pv-list {
        margin: 12px 0;
        font-size: 1.6em;
        color: rgba(0, 0, 0, 0.72);
        line-height: 140%;
        border-bottom: 1px solid #00A862;
        padding-bottom: 12px;
    }
    .pv-wrapper .pv-infoTitle{
        margin-bottom: 6px;
    }
    .pv-wrapper .pv-info li{
       margin: 3px 0;
       text-indent: 2em;
    }
</style>
<script>
    import axios from 'axios'

    export default {
        data(){
            return {
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
                        this.PageViews = data.PageViews;
                        this.VisitorInfo = Array.prototype.reverse.call(data.VisitorInfo);
                    }

                })
            }
        }
    }

</script>
