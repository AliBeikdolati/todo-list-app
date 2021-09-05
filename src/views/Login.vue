<template>
    <div class="login">
        <vs-row vs-w="11" class="row">
            <vs-col class="form-div" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="4" vs-sm="6"
                    vs-xs="12">
                <form class="login-form"
                      @submit.prevent="step === 1 ? submitTellHandler(tell, changeLoginState, error, $vs.notify) : submitCodeHandler(tell, code, loginSuccess, codeError, $vs.notify, $router)">
                    <div class="login-icon">
                        <log-in-icon size="4x" class="custom-class"></log-in-icon>
                        <h2>ورود</h2>
                    </div>
                    <p v-if="step === 1">
                        لطفا برای ورود به سامانه شماره تلفن همراه خود را وارد کنید. تا کد یکبار مصرف برای شما ارسال شود.
                    </p>
                    <p v-if="step === 2">
                        لطفا کد یکبار مصرف را وارد نمایید.
                    </p>
                    <vs-input class="login-input" label-placeholder="شماره تلفن" type="number" :danger="error.hasEroror"
                              :danger-text="error.text" :disabled="step === 2" v-model="tell"/>

                    <!-- this tag show helper for fix error -->
                    <template v-if="error.hasEroror === true">
                        <ul class="error-helper-list">
                            <li class="error-helper__text" :key="key" v-for="(item, key) in error.helper">{{ item }}
                            </li>
                        </ul>
                    </template>
                    <vs-input class="login-input" label-placeholder="کد یکبار مصرف" type="number"
                              :danger="codeError.hasEroror"
                              :danger-text="codeError.text" v-model="code" v-if="step === 2"/>

                    <!--                    &lt;!&ndash; this tag show helper for fix error &ndash;&gt;-->
                    <!--                    <template v-if="error.hasEroror === true">-->
                    <!--                        <ul class="error-helper-list">-->
                    <!--                            <li class="error-helper__text" :key="key" v-for="(item, key) in error.helper">{{ item }}</li>-->
                    <!--                        </ul>-->
                    <!--                    </template>-->

                    <div class="login-form-btns">
                        <vs-button class="login-submit" type="border" :disabled="error.hasEroror"
                                   @click="submitTellHandler(tell, changeLoginState, error, $vs.notify)"
                                   v-if="step === 1" color="success">تایید
                        </vs-button>
                        <vs-button class="login-submit" type="border" :disabled="codeError.hasEroror"
                                   @click="submitCodeHandler(tell, code, loginSuccess, codeError, $vs.notify, $router)"
                                   v-if="step === 2" color="success">تایید
                        </vs-button>
                    </div>

                </form>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
    import {LogInIcon} from 'vue-feather-icons';
    import axios from 'axios';
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'Login',
        components: {
            LogInIcon
        },

        data() {
            return {
                tell: '',
                code: '',
                // step: 1,
                error: {
                    hasEroror: false,
                    text: '',
                    helper: [
                        'شماره تلفن همراه باید با 09 شروع شود.',
                        'شماره تلفن همراه باید 11 رقمی باشد.'
                    ]
                },
                codeError: {
                    hasEroror: false,
                    text: '',
                    helper: [
                        'شماره تلفن همراه باید با 09 شروع شود.',
                        'شماره تلفن همراه باید 11 رقمی باشد.'
                    ]
                }
            }
        },

        methods: {
            ...mapActions([
                'changeLoginState',
                'loginSuccess',
            ]),

            submitTellHandler: (tell, changeLoginState, error, notify) => {
                // let state = 1;
                // console.log(tell);

                if (!error.hasEroror) {
                    axios.request({
                        method: 'post',
                        url: `https://sport.useral.com/api/v1/admin/auth/register?phone_number=${tell}`
                    })
                    // .then((response) => response.json())
                        .then(response => {
                            console.log(response);
                            if (response.status === 200) {
                                // step = 2;
                                notify({
                                    title: 'ارسال کد',
                                    text: response.data.message,
                                    color: 'success'
                                });
                                // state = 2;
                                changeLoginState(2);
                            }
                        })
                        .catch((e) => {
                            if (e.response.status === 422) {
                                notify({
                                    title: 'خطا',
                                    text: e.response.data.phone_number[0],
                                    color: 'danger'
                                })
                            } else if (e.response.status === 429) {
                                notify({
                                    title: 'خطا',
                                    text: "تعداد درخواست های شما بیش از حد مجاز است",
                                    color: 'danger',
                                    dir: 'rtl'
                                })
                            } else {
                                notify({
                                    title: 'خطا',
                                    text: e.response.data.message,
                                    color: 'danger',
                                    dir: 'rtl'
                                })
                            }
                            console.log(e.response);
                            // return step = 1;
                        })
                    // return state;
                }
            },

            submitCodeHandler: (tell, code, loginSuccess, error, notify, router) => {
                // console.log(tell);

                if (!error.hasEroror) {
                    axios.request({
                        method: 'post',
                        url: `https://sport.useral.com/api/v1/admin/auth/login?phone_number=${tell}&code=${code}`
                    })
                    // .then((response) => response.json())
                        .then(response => {
                            console.log(response);
                            if (response.status === 200) {
                                let payload = {
                                    token: response.data.token,
                                    expired_at: response.data.expired_at,
                                    user: response.data.user,
                                    permissions: response.data.permissions
                                };

                                loginSuccess(payload);
                                router.push('/');
                                notify({
                                    title: 'ارسال کد',
                                    text: response.data.message,
                                    color: 'success'
                                })
                            }
                        })
                        .catch((e) => {
                            if (e.response.status === 404) {
                                notify({
                                    title: 'خطا',
                                    text: e.response.data.message,
                                    color: 'danger'
                                })
                            } else if (e.response.status === 429) {
                                notify({
                                    title: 'خطا',
                                    text: "تعداد درخواست های شما بیش از حد مجاز است",
                                    color: 'danger',
                                    dir: 'rtl'
                                })
                            } else if (e.response.status === 410) {
                                notify({
                                    title: 'خطا',
                                    text: e.response.data.message,
                                    color: 'danger',
                                    dir: 'rtl'
                                })
                            }
                            console.log(e.response)
                        })
                }
            }
        },

        watch: {
            // this function validate phone number
            tell() {
                // console.log(this.tell);
                let tellStr = this.tell.toString();
                // console.log(tellStr.startsWith('09'));

                if (!(tellStr.startsWith('09')) || (tellStr.length !== 11)) {
                    this.error.text = 'شماره وارد شده استباه است';
                    this.error.hasEroror = true;
                } else {
                    this.error.hasEroror = false;
                }
            },

            // this function validate code number
            code() {
                // console.log(this.tell);
                let tellStr = this.code.toString();
                // console.log(tellStr.startsWith('09'));

                if (tellStr.length !== 5) {
                    this.codeError.text = 'کد یکبار مصرف باید 5 رقمی باشد.';
                    this.codeError.hasEroror = true;
                } else {
                    this.codeError.hasEroror = false;
                }
            }
        },
        computed: {
            ...mapState([
                'step'
            ])
        }
    }
</script>


<style lang="scss" scoped>
    @import "~vuesax/dist/vuesax.css";

    .login {
        margin-top: 25px;
        display: flex;
        justify-content: center;
        text-align: right;

        .row {
            justify-content: center;
        }

        .form-div {
            /*background-color: #0f0;*/
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px #7b7b7b;

            .login-form {
                width: 100%;
                margin-bottom: 10px;

                .login-icon {
                    text-align: center;
                    margin-top: 20px;
                    margin-bottom: 30px;
                }

                .login-input {
                    width: 100%;
                    margin-top: 30px;
                }

                .error-helper-list {
                    color: rgb(255, 71, 87);
                    padding-right: 15px;
                }

                .login-form-btns {
                    margin-top: 30px;
                    display: flex;
                    justify-content: center;

                    .login-submit {
                        padding: 5px 20px;
                    }
                }
            }
        }
    }

</style>