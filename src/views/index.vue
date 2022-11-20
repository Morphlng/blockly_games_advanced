<template>
    <div style="width: 100%; height: 100%;">
        <navigation v-show="showNav"></navigation>
        <level :src="'blockly_games' + level" @updateFrame="changePage"></level>
    </div>
</template>

<script>
import level from "@/components/level"
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
        }
    }
}
</script>