import Vue from 'vue';
import iView from 'iview';
import TreeView from "vue-json-tree-view"
import axios from 'axios'
import moment from 'moment'
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import Cookies from 'js-cookie';
import 'iview/dist/styles/iview.css';

Vue.use(TreeView)
Vue.use(VueRouter);
Vue.use(iView);

Vue.prototype.$http = axios;
Vue.prototype.$moment = moment;
Vue.filter('moment', function(value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
    return moment(value).format(formatString)
})

if (!String.prototype.moment) {
    String.prototype.moment = function(formatString) {
        formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
        return moment(this).format(formatString)
    };
}

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    
    if (!Cookies.get('ltag') && to.name !== 'login') {  // 判断是否已经登录且前往的页面不是登录页
        next({
            name: 'login'
        });
    } else if (Cookies.get('ltag') && to.name === 'login') {  // 判断是否已经登录且前往的是登录页
        Util.title();
        next({
            name: 'home'
        });
    } else{
        next();
    }
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
