<template>
    <div id="app">
        <div id="nav">
            <Navbar />

            <!--      <router-link to="/">Home</router-link> |-->
            <!--      <router-link to="/about">About</router-link>-->
        </div>
        <router-view/>
    </div>
</template>

<script>
    import Navbar from "./components/Navbar";
    import { mapState } from 'vuex';

    // window.onbeforeunload = function()
    // {
    //     if (this.todos.length) {
    //         localStorage.setItem("todo", JSON.stringify(this.todos));
    //     }
    //
    // };

    export default {
        name: 'App',
        components: {
            Navbar,
        },
        computed: {
            ...mapState([
                'todos',
                'loading'
            ])
        },
        beforeDestroy() {
            // localStorage.todos = this.todos;
            localStorage.setItem("todo", JSON.stringify(this.todos));
        },
    }
</script>

<style lang="scss">
    #app {
        font-family: Vazir, Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        direction: rtl;
    }

    #nav {
        /*padding: 30px;*/

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
