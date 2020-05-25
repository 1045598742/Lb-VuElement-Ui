<template>
  <div class="player">
      <div class="bgcolor"></div>
    <div class="bg" :style="{ backgroundImage: `url(${data.img})` }"></div>
    <div class="main">
        <div class="title">{{data.audio_name}}</div>
        <img :class="{
            stop:state=='stop'
        }" :src="data.img" class="picture" alt="">
        <div class="d">
              <ul class="lyrics" ref="lyrics">
            <li v-for="(item,index) in lyrics" :key="index" :class="{active:activeLyricIndex==index}">
                {{ item.lyric }}
            </li>
        </ul>
        </div>
    </div>
    <div class="footer">
    <button @click="ls" style="margin-right:20px">-0.5倍速</button>
      <div class="play" @click="state == 'stop' ? play() : stop()">
        {{ state == "stop" ? "▶" : "⏸" }}
      </div>
      <button @click="bs" style="margin-right:20px">+0.5倍速</button>
      <div class="progress" ref="progress">
        <div class="progress-loading" :style="{ width }"></div>
        <span class="progress-inner" ref="circle"></span>
      </div>
    </div>
    <audio :src="data.play_url" ref="audio" loop></audio>
  </div>
</template>
<script>
let audio = null;
import { getMusic } from "@/api/getmusic";
export default {
  data() {
    return {
      mp3:
        "https://webfs.yun.kugou.com/202005242310/9fc42a3b1f2978253f72550a581564d0/G148/M07/1C/14/1A0DAFwDrPGAFsVlAD83-eBHT_w602.mp3",
      width: 0,
      data: {
        img: "",
        play_url: "",
      },
      lyrics:[],
      timer: null,
      state: "stop",
      down: false,
      bfb: 0,
      activeLyricIndex:0
    };
  },
//   watch: {
 
//   },
  methods: {
    play() {
      audio.play();
      audio.volume = 1;
      this.state = "play";
      this.timer = setInterval(() => {
        if (this.down) return;
        const { currentTime, duration } = audio;
        let num = currentTime / duration;
        this.width = num * 100 + "%";
        this.$refs.circle.style.left = this.width;
        this.lyricsMove(currentTime,duration)
        if (num >= 1) {
          this.width = 0;
          this.$refs.circle.style.left = 0;
          this.state = "stop";
          this.clearTime();
        }
      }, 200);
    },
    stop() {
      this.state = "stop";
      this.clearTime();
      audio.pause();
    },
    clearTime() {
      clearInterval(this.timer);
      this.timer = null;
    },
    bs() {
      audio.playbackRate += 0.5;
    },
    ls() {
      audio.playbackRate -= 0.5;
    },
    lyricsMove(currentTime){
        this.lyrics.some((e,i)=>{
            let index = 0
            if(currentTime<=e.time){
                index = i-1>=0?i-1:0;
            }else if(i==this.lyrics.length-1){
                index = i;
            }
             this.activeLyricIndex = index;
             this.activeLyricIndexChange(index)
             return index
        })
    },
    activeLyricIndexChange(index){
            const lyrics = this.$refs.lyrics
            const top = lyrics.querySelector('li.active').offsetTop;
            lyrics.style.top = -top+'px';

    } ,
    mousedown(ev) {
      this.down = true;
      ev.preventDefault();
      window.addEventListener("mousemove", this.mousemove, false);
      window.addEventListener("mouseup", this.mouseup, false);
    },
    mousemove(ev) {
      ev.stopPropagation();
      const circle = this.$refs.circle;
      const progress = this.$refs.progress;
      const { left, width } = progress.getBoundingClientRect();
      let clientX = ev.clientX;
      let positionX = null;
      if (clientX >= left && clientX <= left + width) {
        positionX = clientX - left;
      }
      if (clientX < left) {
        positionX = 0;
      }
      if (clientX > left + width) {
        positionX = width;
      }
      this.bfb = positionX / width;
      this.width = this.bfb * 100 + "%";
      circle.style.left = positionX + "px";
    },
    mouseup(ev) {
      this.down = false;
      audio.currentTime = audio.duration * this.bfb;
      window.removeEventListener("mousemove", this.mousemove);
      window.removeEventListener("mouseup", this.mouseup);
    },
    circleEvent() {
      const circle = this.$refs.circle;
      circle.addEventListener("mousedown", this.mousedown, false);
    },
  },
  mounted() {
    audio = this.$refs.audio;
    getMusic().then((res) => {
      let reg = /^jQuery[\d\D]+\(([\d\D]+)\);$/;
      this.data = eval(`(${reg.exec(res.data)[1]})`).data;
      let arr = [];
      // for(let i=0;i<3;i++){
      //   /\[([\d]{2}):([\d]{2}).([\d]{2})\]([^\s]+)/g.exec()
      // }
      this.data.lyrics.replace(
        /\[([\d]{2}):([\d]{2}).([\d]{2})\]([^\n]+)/g,
        (a, b, c, d, e) => {
          let key = b * 60 + Number(c)+d/100 ;
          arr.push({ time: key, lyric: e });
        }
      );
      //   console.log(arr);
      this.lyrics = arr
    });
    this.circleEvent();
    this.$refs.progress.addEventListener('click',ev=>{
        ev.stopPropagation()
        if(ev.target.className === 'progress'||ev.target.className==="progress-loading"){
        this.width = ev.offsetX/this.$refs.progress.offsetWidth * 100 + "%";
        this.$refs.circle.style.left = ev.offsetX + "px";
         audio.currentTime = audio.duration * ev.offsetX/this.$refs.progress.offsetWidth;
        }
        
    },false)

  },
};
</script>
<style lang="scss">
.player {
  position: relative;
  height: 100%;
  .bgcolor{
        position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1; 
    background:rgba(0,0,0,.5);
  }
  .bg {
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    filter: blur(90px);
      

  }
  .main{
      display: flex;
      justify-content: space-between;
      margin: auto;
      position: absolute;
      z-index: 2;
      width: 840px;
      left: 0;
      top: 200px;
      right: 0;
      .title{
          text-align: center;
          position: absolute;
          top: -120px;
          font-size: 30px;
          color: white;
          width: 100%;
      }
      .picture{
          margin-left: 80px;
          border-radius: 50%;
          border: 5px solid rgba(255,255,255,.8);
          height: 300px;
          height: 300px;
          display: block;
          object-fit: cover;
          animation: img 15s linear infinite;
          &.stop{
              animation-play-state: paused;
          }
      }
      @keyframes img {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
      }
      .d{
        width: 460px;
        min-height: 500px;
        height: 500px;
        overflow: hidden;
      }
      .lyrics{
        //   padding-top: 250px;
          top: 0;
          position: relative;
        min-height: 500px;
        height: 500px;
        margin-top: -7px;
        margin-left: 116px;
        transition: all .3s linear;
        li{
            list-style: none;
            // height: 34px;
            line-height: 34px;
            font-size: 18px;
            color: white;
            transition: all .3s;
            &.active{
          color: rgb(17, 164, 240);
      }
        }
      }
  }
  .footer {
    position: fixed;
    left: 0;
    width: 100%;
    height: 80px;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    .play {
      font-size: 40px;
      color: white;
      cursor: pointer;
      margin-right: 10px;
    }
    .progress-loading {
      border-radius: 2px;
    }
    .progress {
      height: 4px;
      width: 500px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 2px;
      position: relative;
      cursor: pointer;
      .progress-loading {
        position: absolute;
        height: 100%;
        background: rgb(17, 164, 240);
        cursor: pointer;
      }
      .progress-inner {
        display: inline-block;
        width: 16px;
        height: 16px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
        border-radius: 50%;
        background: white;
      }
    }
  }
}
</style>
