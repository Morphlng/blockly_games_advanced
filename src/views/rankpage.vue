<template>
  <div>
    <el-select v-model="selectedLevel" placeholder="请选择关卡">
      <el-option v-for="level in levels" :key="level.value" :label="level.label" :value="level.value">
      </el-option>
    </el-select>
    <el-table :data="rankings" border>
      <el-table-column prop="rank" label="排名"> </el-table-column>
      <el-table-column prop="user" label="用户名"> </el-table-column>
      <el-table-column prop="time" label="用时">
        <template slot-scope="{ row }">
          <template v-if="row.passed">
            {{ row.time }}
          </template>
          <template v-else>
            --
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="passed" label="是否过关">
        <template slot-scope="{ row }">
          <template v-if="row.passed">
            是
          </template>
          <template v-else>
            否
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLevel: "",
      levels: [
        { value: "all", label: "总计用时" },
        { value: "puzzle", label: "拼图" },
        { value: "maze", label: "迷宫" },
        { value: "bird", label: "鸟" },
        { value: "turtle", label: "乌龟" },
        { value: "movie", label: "电影" },
        { value: "music", label: "音乐" },
        { value: "pond", label: "池塘" },
      ],
      rankings: [],
    };
  },
  watch: {
    selectedLevel(newValue) {
      this.getRankings(newValue);
    },
  },
  methods: {
    async fetchRankings(chapter) {
      let data = await this.$api.time.getchapter(chapter);
      // console.log("data",data);
      return data;
    },
    async fetchTotalRankings() {
      let data = await this.$api.time.gettotal();
      return data;
    },
    async getRankings(chapter) {
      let rankings;
      if (chapter === "all") {
        rankings = await this.fetchTotalRankings();
      } else {
        rankings = await this.fetchRankings(chapter);
      }
      this.rankings = rankings;
    },
  },
};
</script>
