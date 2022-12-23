import Vue from "vue";
import Router from "vue-router";
import Login from "./views/login";
import LogOut from "./views/logout";
import Register from "./views/register";
import Index from "./views/index";
import Wrong from "./views/wrong";
import Rank from "./views/rankpage"

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/register",
            name: "register",
            component: Register,
        },
        {
            path: "/rank",
            name: "rank",
            component: Rank,
        },
        {
            path: "/logout",
            name: "logout",
            component: LogOut,
        },
        {
            path: "/",
            name: "index",
            component: Index,
            redirect: "/index",
            children: [
                {
                    path: "/index",
                    meta: { requireAuth: true },
                },
                {
                    path: "/puzzle",
                    meta: { requireAuth: true },
                },
                {
                    path: "/maze",
                    meta: { requireAuth: true },
                },
                {
                    path: "/bird",
                    meta: { requireAuth: true },
                },
                {
                    path: "/turtle",
                    meta: { requireAuth: true },
                },
                {
                    path: "/movie",
                    meta: { requireAuth: true },
                },
                {
                    path: "/music",
                    meta: { requireAuth: true },
                },
                {
                    path: "/pond-tutor",
                    meta: { requireAuth: true },
                },
                {
                    path: "/pond-duck",
                    meta: { requireAuth: true },
                },
                {
                    path: "/about",
                    name: "about",
                },
            ],
            meta: { requireAuth: true },
        },
        {
            path: "*",
            name: "wrong",
            component: Wrong,
        },
    ],
});

// 验证 token，存在才跳转
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem("token");
    if (to.meta.requireAuth) {
        if (token) {
            next();
        } else {
            next({
                path: "/login",
                query: { redirect: to.fullPath },
            });
        }
    } else {
        next();
    }
});

export default router;
