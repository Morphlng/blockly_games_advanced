<template>
    <div class="timer">
    <span id="txt">{{txt}}</span>
    <!-- <input @click="start()" type="button" value="开始"> -->
    <!-- <input @click="stop()" type="button" value="暂停">  -->
    <!-- <input @click="reset()" type="button" value="重置">      -->
    </div>
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