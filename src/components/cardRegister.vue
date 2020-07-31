<template>
    <section class="register-filed-card form-area">
        <div class="wrapper">
            <div class="register-form-username">
                <input type="text" id="username" name="username" placeholder="输入您的星享卡号（请勿输入空格或下划线）" v-model="username">
                <label for="username" class="form-label">输入您的星享卡号（请勿输入空格或下划线）</label>
            </div>
            <div class="register-form-password">
                <input type="password" id="password" name="password" placeholder="输入密码" v-model="password">
                <label for="password" class="form-label">输入密码</label>
            </div>
            <div class="more">
                <a href="javascript:;" class="emphas">这是什么?</a>
            </div>
            <p class="register-notice">
                如果您曾购买了星享卡，在购买星享卡后的60天内，您可使用该星享卡注册您的星享俱乐部帐户，或者将该星享卡关联到您既有的星享俱乐部帐户下。
            </p>
            <div class="register-btn">
                <button class="login-action" disabled>
                    下一步
                </button>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
    data(){
        return {
            username: '',
            password: ''
        }
    },
    mounted(){
        this.init();
    },
    methods: {
        init(){
            let _self = this;

            $('input[placeholder]').focus(function(){
                let inputID = $(this).attr('id'),
                    label = $('label[for=' + inputID + ']');

                label.animate({
                    'top': '-24px',
                    'font-size': '13px',
                    'font-weight': '400',
                    'opacity': '0.56',
                }, 200);

                $(this).css({
                    'border-bottom': '1px solid #00A862'
                });

            }).blur(function(){
                let inputID = $(this).attr('id'),
                    label = $('label[for=' + inputID + ']');

                // 有数据时保持focus状态，_self[inputID]为_self.username或_self.password
                if(_self[inputID] === ''){
                    label.animate({
                        'top': '0',
                        'font-size': '16px',
                        'font-weight': '400',
                        'opacity': '0.32',
                    }, 200);

                    $(this).css({
                        'border-bottom': '1px solid rgba(0, 0, 0, 0.24)'
                    });

                }else{
                    $(this).css({
                        'border-bottom': '1px solid #00A862'
                    });
                }
            });
        }
    }
}
</script>
