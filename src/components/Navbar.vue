<template>
    <div>
        <vs-navbar v-model="activeItem" class="nabarx">
            <div slot="title">
                <vs-navbar-title>
                    لیست کار ها
                </vs-navbar-title>
            </div>

            <vs-navbar-item index="0">
                <router-link to="/">مشاهده لیست کار ها</router-link>
            </vs-navbar-item>
            <vs-navbar-item index="1">
                <router-link to="login">ورود</router-link>
            </vs-navbar-item>
        </vs-navbar>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        data() {
            return {
                activeItem: 0
            }
        }
    }
</script>

<style lang="scss" scoped>
    .nabarx {
        padding: 15px;
    }
</style>