<template>
    <div style="width: 100%; height: 100%">
        <navigation v-show="isIndex"></navigation>
        <timer v-show="!isIndex" ref="timer"></timer>
        <level :src="'blockly_games' + level" @updateFrame="changePage"></level>
    </div>
</template>

<script>
import { Loading } from "element-ui";
import level from "@/components/level";
import navigation from "@/components/navigation";
import timer from "@/components/timer";

export default {
    components: { level, navigation, timer },
    data() {
        return {
            isIndex: true,
            level: "/index.html",
        };
    },
    mounted() {
        window.onstorage = (event) => {
            let record = {};
            record[event.key] = event.newValue;
            record["email"] = localStorage.getItem("username");

            if (event.newValue != null && record.email != "anonymous@anonymous.com") {
                this.$refs.timer.stop();
                this.$api.record.save(record);
            }
        };

        if (window.location.pathname !== "/") {
            this.level = window.location.pathname + ".html";
        }
    },
    methods: {
        startTimer(dest) {
            if (dest != "index") {
                let timer = this.$refs.timer;
                timer.reset();
                timer.start();
            }
        },
        changePage(dest) {
            // E.g. dest: { chapter:'maze', level: '1' }
            this.isIndex = dest.chapter == "index" ? true : false;
            this.startTimer(dest.chapter);

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
