<template>
    <!-- <div class="timer">
    <span id="txt">{{txt}}</span> -->
    <div class="dateBox">
    <div class="time">{{ txt }}</div>
    </div>
    <!-- </div> -->
</template>
<script>
    export default {
    name: 'Timer',
    data () {
        return { 
            timer: null,
            count: 0,
            clickStart: 0,
            txt: '00:00:00:00'
        }
    },
    mounted(){
        // this.start()
    },
    destroyed(){
        this.stop()
    },
 
methods: {
  // 计时
  start () { // 开始
    this.clickStart++
    // if (this.clickStart % 2 === 0) { // 此处不必判断奇偶数
      clearInterval(this.timer)
      this.clickStart = 0
    // } else {
      this.timer = setInterval(() => {
      let h = parseInt(this.count / 1000 / 60 / 60)
      let m = parseInt(this.count / 1000 / 60) % 60
      let s = parseInt(this.count / 1000) % 60
      let ms = parseInt(this.count / 10) % 100
      h = h < 10 ? '0' + h : h
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      ms = ms < 10 ? '0' + ms : ms
      this.txt = h + ':' + m + ':' + s + ':' + ms
      this.count += 10
      }, 10)
    // }
  },
  stop () { // 暂停
    window.clearInterval(this.timer)
  },
  reset () { // 重置
    this.count = 0
    this.clickStart = 0
    clearInterval(this.timer)
    this.txt = '00:00:00:00'
  },
  curtime(){
    return this.txt
  }
 }
}
</script>
<style scoped>
.dateBox {
  border: 2px solid #A9C9E2;
 background: burlywood;
 background-image: url("../../assets/images/timer2.png");
 background-repeat: no-repeat;
 display: flex;
 align-items: flex-end;
 justify-content: flex-end;
 position: absolute;
 bottom: 70px;
 left: 50px;
 width: 300px;
 height: 68px;
}
.time {
 font-size: 48px;
 color: #ffffff;
}
</style>