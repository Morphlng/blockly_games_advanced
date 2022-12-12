<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="rank" label="排名" width="180">
            </el-table-column>
            <el-table-column prop="user" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="time" label="得分">
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
export default {
    props: ['level'],
    data() {
        return {
            tableData: []
        }
    },
    created() {
        this.getData()
    },
    methods: {
        async getData() {
            let level = this.level;
            let data = await this.$api.time.get(level);
            for (let row in data) {
                this.tableData.push(data[row]);
            }
            console.log(this.tableData)
        },
    }
}
</script>
