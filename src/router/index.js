import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import PageNotFound from "../views/PageNotFound";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '*',
        name: 'PageNotFound',
        component: PageNotFound
    }
];

const router = new VueRouter({
    routes
});

export default router