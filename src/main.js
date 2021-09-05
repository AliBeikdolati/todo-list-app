import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//import vuesax
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css'

// import fonts
import './assets/font.css';

Vue.config.productionTip = false;
Vue.use(Vuesax);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
