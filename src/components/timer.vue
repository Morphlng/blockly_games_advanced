<!--<template>-->
<!--    <div class="timer">-->
<!--    <span id="txt">{{txt}}</span>-->
<!--    &lt;!&ndash; <input @click="start()" type="button" value="开始"> &ndash;&gt;-->
<!--    &lt;!&ndash; <input @click="stop()" type="button" value="暂停">  &ndash;&gt;-->
<!--    &lt;!&ndash; <input @click="reset()" type="button" value="重置">      &ndash;&gt;-->

<!--&lt;!&ndash;      <div class="pop" v-if="showSkipSelect">&ndash;&gt;-->
<!--&lt;!&ndash;        <span id="txt">用时过长，是否跳关？</span>&ndash;&gt;-->
<!--&lt;!&ndash;        <button @click="showSkipSelect=false" class="btn">取消</button>&ndash;&gt;-->
<!--&lt;!&ndash;        <button @click="needSkip=true" class="btn">确认</button>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--    </div>-->

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
            txt: '00:00:00:00',
            showSkipSelect: false,
            lastSkipTime: 0,
            needSkip: false
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


      let levels = ["puzzle", "maze", "bird", "turtle", "movie", "music", "pond-tutor", "pond-duck"]
      let frame = document.getElementById('myframe')
      let pathname = frame.contentWindow.location.pathname;
      let level = pathname.split('/').pop().replace('.html', '')
      let levelNum = levels.indexOf(level)
      if (levelNum !== 7 && levelNum !== -1) {

        if (this.needSkip) {
          this.$router.replace(levels[levelNum + 1])
          this.$router.go(0)
          this.reset()
        }
        if (this.showSkipSelect) {
          this.lastSkipTime = this.count
        } else if (this.count - this.lastSkipTime >= 5 * 1000 * 60) {
          if (this.count - this.lastSkipTime > 5 * 1000 * 60) {
            this.lastSkipTime = 0
          }
          else{
            this.showSkipSelect = true
            this.$confirm('此关卡用时较长, 是否跳过本关卡?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {
              this.needSkip = true
            }).catch(() => {
              this.lastSkipTime = this.count
              this.showSkipSelect = false
            });
            this.lastSkipTime = this.count
          }
        }
      }

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
    this.lastSkipTime = 0
    this.showSkipSelect = false
    this.needSkip = false
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
