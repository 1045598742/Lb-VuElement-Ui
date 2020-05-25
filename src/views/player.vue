<template>
    <div class="player">
        <audio :src="mp3" ref="audio"></audio>
        <button @click="play" ref="hehe">点击</button>
        <button @click="stop">点击</button>
        <button @click="bs">点击</button>
        <button @click="ls">点击</button>
        <div>
            <div :style="{
                width:width,
                background:'red',
                height:'1px'
            }"></div>
        </div>
    </div>
</template>
<script>
import {getMusic} from '@/api/getmusic'
export default {
    data () {
        return {
            mp3:'https://webfs.yun.kugou.com/202005242310/9fc42a3b1f2978253f72550a581564d0/G148/M07/1C/14/1A0DAFwDrPGAFsVlAD83-eBHT_w602.mp3',
            width:0,
            datas:{}
        }
    },
    methods: {
    play(){
        const audio = this.$refs.audio
        audio.play()
        audio.volume = 1;
        console.dir(audio)
        setInterval(() => {
           const {currentTime,duration} = audio;
            this.width = currentTime/duration*100+'%'
        }, 500);
    },
    stop(){
        this.$refs.audio.pause()
    } ,
    bs(){
       this.$refs.audio.playbackRate += 0.5;
    },
    ls(){
        this.$refs.audio.playbackRate -= 0.5;
    }
    },
    mounted () {
      getMusic().then(res=>{
        let reg = /^jQuery[\d\D]+\(([\d\D]+)\);$/
        this.datas = eval(`(${reg.exec(res.data)[1]})`)
        let arr = []
        // for(let i=0;i<3;i++){
        //   /\[([\d]{2}):([\d]{2}).([\d]{2})\]([^\s]+)/g.exec()
        // }
        this.datas.data.lyrics.replace(/\[([\d]{2}):([\d]{2}).([\d]{2})\]([^\s]+)/g,(a,b,c,d,e)=>{
          let key = b*60+c+(+d);
          arr.push({ time:key, lyric:e})
        })
        console.log(arr)
      })
    }
}
</script>
<style lang="scss">
    .player{
        height: 800px;
    }
</style>