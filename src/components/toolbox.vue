<template>
<div class="toolbox">
  <el-button type="primary" @click="hideTimer">隐藏/显示计时器</el-button>
  <el-popover
    ref="popover"
    placement="right"
    title="排行榜"
    width="800"
    trigger="hover"
    >
    <p>{{lvl}}</p>
    <ranklist :level=lvl></ranklist>
    <el-button slot="reference">排行榜</el-button>
  </el-popover>
</div>
</template>

<script>
import ranklist from './ranklist.vue'
export default {
  components:{ranklist},
    props:['lvl'],
    data() {
      return {
        visible2: false,
      };
    },
    methods:{
      hideTimer(){
        this.$emit('hidetimer')
      }
    }
}
</script>

<style>
.toobox{
  margin: 2%;
  padding: 3%;
}
</style>