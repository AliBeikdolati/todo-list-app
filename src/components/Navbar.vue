<template>
    <div class="navbar">
        <vs-navbar v-model="activeItem" class="nabarx">
            <div slot="title" class="navbar-brand">
                <vs-navbar-title>
                    لیست کار ها
                </vs-navbar-title>
            </div>
            <template v-if="auth === true">
                <vs-navbar-item index="0">
                    <router-link to="/">مشاهده لیست کار ها</router-link>
                </vs-navbar-item>
                <vs-navbar-item index="1">
                    <button @click="logout(setAuth, $router)" class="logout-btn">
                        <router-link to="/login">خروج</router-link>
                    </button>

                </vs-navbar-item>
            </template>

            <template v-if="auth === false">
                <vs-navbar-item index="1">
                    <router-link to="login">ورود</router-link>
                </vs-navbar-item>
            </template>

        </vs-navbar>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { gsap } from 'gsap';

    export default {
        name: "Navbar",
        data() {
            return {
                activeItem: 0
            }
        },

        methods: {
            ...mapActions([
                'setAuth'
            ]),

            logout: (setAuth, router) => {
                setAuth(false);
                localStorage.setItem("auth", JSON.stringify(false));
                router.push('/login')
            }
        },

        computed: {
            ...mapState([
                'auth'
            ])
        },
        mounted() {
            gsap.from('.navbar', {
                duration: 1,
                y: -100
            })
            gsap.from('.navbar-menu', {
                duration: 1,
                delay: 1,
                x: 150
            })
        }
    }
</script>

<style lang="scss" scoped>
    .nabarx {
        padding: 15px;
    }

    .logout-btn {
        border: 0;
        background-color: inherit;
    }
</style>