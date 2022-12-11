<template>
    <div class="dateBox">
        <div class="time">{{ txt }}</div>
    </div>
</template>

<script>
export default {
    name: "Timer",
    data() {
        return {
            timer: null,
            count: 0,
            clickStart: 0,
            txt: "00:00:00:00",
            showSkipSelect: false,
            lastSkipTime: 0,
            needSkip: false,
        };
    },
    destroyed() {
        this.stop();
    },
    methods: {
        // 计时
        start() {
            let chapters = [
                "puzzle",
                "maze",
                "bird",
                "turtle",
                "movie",
                "music",
                "pond-tutor",
                "pond-duck",
            ];

            let frame = document.getElementById("myframe");
            let pathname = frame.contentWindow.location.pathname;
            let chapter = pathname.split("/").pop().replace(".html", "");
            let chapterNum = chapters.indexOf(chapter);

            // 开始
            clearInterval(this.timer);
            this.clickStart = 0;

            this.timer = setInterval(() => {
                let h = parseInt(this.count / 1000 / 60 / 60);
                let m = parseInt(this.count / 1000 / 60) % 60;
                let s = parseInt(this.count / 1000) % 60;
                let ms = parseInt(this.count / 10) % 100;
                h = h < 10 ? "0" + h : h;
                m = m < 10 ? "0" + m : m;
                s = s < 10 ? "0" + s : s;
                ms = ms < 10 ? "0" + ms : ms;
                this.txt = h + ":" + m + ":" + s + ":" + ms;
                this.count += 10;

                // 如果不是首页或池塘大战, 则判断是否需要跳过
                if (chapterNum !== -1 && chapterNum !== 7) {
                    if (this.needSkip) {
                        this.$router.replace(chapters[chapterNum + 1]);
                        this.$router.go(0);
                        this.reset();
                    }
                    if (this.showSkipSelect) {
                        this.lastSkipTime = this.count;
                    } else if (this.count - this.lastSkipTime >= 1 * 1000 * 60) {
                        if (this.count - this.lastSkipTime > 1 * 1000 * 60) {
                            this.lastSkipTime = 0;
                        } else {
                            this.showSkipSelect = true;
                            this.$confirm("此关卡用时较长, 是否跳过本关卡?", "提示", {
                                confirmButtonText: "确定",
                                cancelButtonText: "取消",
                            })
                                .then(() => {
                                    this.needSkip = true;
                                })
                                .catch(() => {
                                    this.lastSkipTime = this.count;
                                    this.showSkipSelect = false;
                                });
                            this.lastSkipTime = this.count;
                        }
                    }
                }
            }, 10);
        },
        stop() {
            // 暂停
            window.clearInterval(this.timer);
        },
        reset() {
            // 重置
            this.count = 0;
            this.clickStart = 0;
            clearInterval(this.timer);
            this.txt = "00:00:00:00";
            this.lastSkipTime = 0;
            this.showSkipSelect = false;
            this.needSkip = false;
        },
        curtime() {
            return this.txt;
        },
    },
};
</script>

<style scoped>
.dateBox {
  border: 2px solid #A9C9E2;
  background: burlywood;
  background-image: require("../../assets/images/timer2.png");
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  position: absolute;
  bottom: 5%;
  left: 2%;
  width: 10%;
  height: 5%;
}

.time {
  font-size: 3vh;
  color: #ffffff;
}
</style>
