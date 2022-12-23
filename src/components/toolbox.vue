<template>
    <div class="toolbox">
        <el-button type="primary" @click="hideTimer">隐藏/显示计时器</el-button>
        <el-popover ref="popover" placement="right" title="关卡：" width="500" height="1000" trigger="hover">
            <p>{{ lvl }}</p>
            <ranklist :level="lvl"></ranklist>
            <el-button slot="reference">本关排行榜</el-button>
        </el-popover>
        <el-button slot="reference" @click="totalrank">总排行榜</el-button>
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
        totalrank() {
            this.$router.push("/rank")
        }
    },
};
</script>

<style scoped>
.toobox {
    margin: 2%;
    padding: 3%;
    align-content: center;
}

.el-popover {
    height: 500px;
    overflow: auto;
}

.el-button {
    width: 150px;
}
</style>
