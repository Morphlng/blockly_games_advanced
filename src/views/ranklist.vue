<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="rank" label="排名" width="180"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
            <el-table-column prop="score" label="得分"> </el-table-column>
        </el-table>
        <timer></timer>
    </div>
</template>

<script>
// import Timer from "@/components/timer"
import timer from "../components/timer.vue";
export default {
    components: { timer },
    data() {
        return {
            tableData: [],
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.tableData.push({ rank: 1, name: "fgd", score: 100 });
        },
    },
};
</script>
