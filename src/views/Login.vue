<template>
    <div class="login-wrap">
        <vue-particles color="#dedede" :particlesNumber="particlesNumber">
        </vue-particles>
        <div class="bgColor">
            辰安任务系统
        </div>
        <div class="ms-login">
            <Form :model="formItem" :label-width="60">
                <FormItem label="用户名">
                    <Input v-model="formItem.input" />
                </FormItem>
                <FormItem label="密  码">
                    <Input v-model="formItem.input" />
                </FormItem>

            </Form>
            <ParticleEffectButton
                    ref="demoButtonRef"
                    :text="text"
                    :hidden.sync="hidden"
                    :animating.sync="animating"
                    :button-styles="buttonStyles"
                    :button-options="buttonOptions"
                    @complete="onComplete"
            />
        </div>

    </div>
</template>

<script>
    import VueParticles from 'vue-particles/src/vue-particles/vue-particles.vue'

    import ParticleEffectButton from '../components/particle-effect-button';

    export default {
        components: {VueParticles,ParticleEffectButton},
        data: function () {
            return {
                buttonStyles: {
                    background: '#34962d',
                    color: '#fff',
                    textAlign:'center',
                    lineHeight:'5px',
                    height:'50px',
                    zIndex:'120000'
                },
                buttonOptions: {
                    particleColor: '#ff1d50',
                    duration: 2000,
                    direction: 'right',
                    flexDirection:'row',
                },
                text:'登录',
                hidden: false,
                animating: false,
                effectHidden: false,
                particlesNumber: 200,
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                formItem:{}
            }
        },
        methods: {
            login(){
                this.$router.push("/")
            },
            onBegin() {
                console.log('begin event')
            },
            onComplete() {
                this.$router.push("/")
            }
        }
    }
</script>

<style scoped>

    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url("../assets/sky.jpg");
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -210px;
        text-align: center;
        font-size: 30px;
        color: #fff;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 220px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }

    .bgColor {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -220px;
        margin-left: -160px;
        z-index: 2000;
        text-align: center;
        float: right;
        width: 245px;
        height: 56px;
        line-height: 56px;
        font-size: 30px;
        color: #fff;
    }
</style>
