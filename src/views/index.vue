<template>
    <div style="width: 100%; height: 100%;">
        <navigation v-show="showNav"></navigation>
        <level :src="'blockly_games' + level" @updateFrame="changePage"></level>
    </div>
</template>

<script>
import { Loading } from 'element-ui';
import level from "@/components/level";
import navigation from "@/components/navigation";

export default {
    components: { level, navigation },
    data() {
        return {
            showNav: true,
            level: '/index.html'
        }
    },
    mounted() {
        console.log(this);

        window.onstorage = (event) => {
            let record = {};
            record[event.key] = event.newValue;
            record["email"] = localStorage.getItem('username');

            if (event.newValue != null && record.email != 'anonymous@anonymous.com') {
                this.$api.record.save(record);
            }
        };

        if (window.location.pathname !== '/') {
            this.level = window.location.pathname + '.html';
        }
    },
    methods: {
        changePage(dest) {
            this.showNav = (dest == 'index') ? true : false;

            // Call on a dummy api to check validity of token
            this.$api.user.findUser({
                email: localStorage.getItem('username')
            }).then((res) => {
                if (res.data.status == '401') {
                    let _this = this;
                    let loadingInstance = Loading.service({ fullscreen: true, background: 'rgba(0, 0, 0, 0.5)' });

                    this.$message({
                        showClose: true,
                        message: res.data.msg + "，即将跳转至登陆页面",
                        type: 'error',
                        duration: 3000,
                        onClose: () => {
                            loadingInstance.close();
                            _this.$router.push('/login');
                        }
                    });
                }
            })
        }
    }
}
</script>