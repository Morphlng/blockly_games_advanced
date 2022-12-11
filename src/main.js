import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ElementUI from "element-ui";
import "./common/style/common.scss";
import api from "./api";

Vue.use(ElementUI);
Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");

// 加入全局localStorage守卫
window.addEventListener('storage', function (event) {
    if (event.key == "username")
        localStorage.setItem("username", event.oldValue);
})