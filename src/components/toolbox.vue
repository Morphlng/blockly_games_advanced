<template>
    <div class="toolbox">
        <el-button type="primary" @click="hideTimer">隐藏/显示计时器</el-button>
        <el-popover ref="popover" placement="right" title="关卡：" width="500" height="1000" trigger="hover">
            <p>{{ lvl }}</p>
            <ranklist :level="lvl"></ranklist>
            <el-button slot="reference">排行榜</el-button>
        </el-popover>
    </div>
</template>

<script>
import ranklist from "./ranklist";

export default {
    components: { ranklist },
    props: ["lvl"],
    data() {
        return {
            visible2: false,
        };
    },
    methods: {
        hideTimer() {
            this.$emit("hidetimer");
        },
    },
};
</script>

<style scoped>
.toobox {
    margin: 2%;
    padding: 3%;
}

.el-popover {
    height: 500px;
    overflow: auto;
}

.el-button {
    widows: 150px;
}
</style>
