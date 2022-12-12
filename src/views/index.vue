<template>
    <div style="width: 100%; height: 100%">
        <navigation v-show="isIndex"></navigation>
        <timer v-show="timerVis" ref="timer"></timer>
        <level :src="'blockly_games' + level" @updateFrame="changePage"></level>
        <float-btn :form="form" v-show="!isIndex">
            <toolbox :lvl="lvl" @hidetimer="switchtimervis"></toolbox>
        </float-btn>
    </div>
</template>

<script>
import { Loading } from "element-ui";
import level from "@/components/level";
import navigation from "@/components/navigation";
import timer from "@/components/timer";
import FloatBtn from "@/components/floatBtn.vue";
import Toolbox from "@/components/toolbox.vue";

export default {
    components: { level, navigation, timer, FloatBtn, Toolbox },
    data() {
        return {
            isIndex: true,
            timerVis: false,
            level: "/index.html",
            lvl: "",
            form: {
                themeColor: {
                    hsl: { h: 200, s: 0, l: 0, a: 1 },
                    hex: "#000000",
                    hex8: "#000000FF",
                    rgba: { r: 0, g: 0, b: 0, a: 1 },
                    hsv: { h: 200, s: 0, v: 0, a: 1 },
                    oldHue: 200,
                    source: "hex",
                    a: 1,
                },
                fontSize: 28,
            },
        };
    },
    mounted() {
        window.onstorage = (event) => {
            this.$refs.timer.stop();
            let record = {};
            record[event.key] = event.newValue;
            record["email"] = localStorage.getItem("username");

            if (event.newValue != null && record.email != "anonymous@anonymous.com") {
                this.$api.record.save(record);
                let passtime = this.$refs.timer.curtime();
                this.savetime(record.email, event.key, passtime);
            }
        };

        if (window.location.pathname !== "/") {
            this.level = window.location.pathname + ".html";
        }
    },
    methods: {
        switchtimervis() {
            this.timerVis = !this.timerVis;
        },
        savetime(email, level, time) {
            this.$api.time.save({
                email: email,
                level: level,
                time: time,
            });
        },
        showtime(dest) {
            let timer = this.$refs.timer;
            timer.reset();

            if (dest != "index") {
                timer.start();
            }
        },
        changePage(dest) {
            // E.g. dest: { chapter:'maze', level: '1' }
            this.showtime(dest.chapter);
            this.lvl = dest.chapter + dest.level;
            this.isIndex = dest.chapter == "index" ? true : false;
            // 如果计时器被用户关闭，则不在切换页面时显示计时器
            if (this.timerVis) {
                this.timerVis = !this.isIndex;
            }
            // Call on a dummy api to check validity of token
            this.$api.user
                .findUser({
                    email: localStorage.getItem("username"),
                })
                .then((res) => {
                    if (res.data.status == "401") {
                        let _this = this;
                        let loadingInstance = Loading.service({
                            fullscreen: true,
                            background: "rgba(0, 0, 0, 0.5)",
                        });

                        this.$message({
                            showClose: true,
                            message: res.data.msg + "，即将跳转至登陆页面",
                            type: "error",
                            duration: 3000,
                            onClose: () => {
                                loadingInstance.close();
                                _this.$router.push("/login");
                            },
                        });
                    }
                });
        },
    },
};
</script>
