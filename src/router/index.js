import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import PageNotFound from "../views/PageNotFound";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        // beforeEnter: routerAuthGuard,
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        // beforeEnter: routerLoginGuard,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    },
    {
        path: '*',
        name: 'PageNotFound',
        component: PageNotFound
    }
];

// function routerAuthGuard(to, from, next) {
//     let user = JSON.parse(localStorage.getItem("user"));
//     // if (user) {
//         if( user && user.expired_at < Date.now() ) {
//             next('/');
//         } else {
//             next('/login');
//         }
//     // }
//
// }
// function routerLoginGuard(to, from, next) {
//     let user = JSON.parse(localStorage.getItem("user"));
//     // let auth = JSON.parse(localStorage.getItem("auth"));
//     // console.log(user);
//     try {
//         if( !user || user.expired_at > Date.now() ) {
//             next('/login');
//         }
//         // else {
//         //     next('/');
//         // }
//     } catch (e) {
//         next('/login')
//     }
//
// }

const router = new VueRouter({
    routes
});

// router.beforeEach((to, from, next) => {
//     let user = JSON.parse(localStorage.getItem("user"));
//     try {
//         if (to.path === '/'){
//             if( !user || user.expired_at > Date.now()) {
//                 next();
//             } else {
//                 next('/login');
//             }
//         }
//
//     } catch (e) {
//         next('/login')
//     }
// })

router.beforeEach((to, from, next) => {
    let auth = JSON.parse(localStorage.getItem("auth"));
    if (to.name === 'Login' && auth) next({ name: 'Home' });
    else next();
    if (to.name === 'Home' && !auth) next({ name: 'Login' });
    else next();
})

export default router
