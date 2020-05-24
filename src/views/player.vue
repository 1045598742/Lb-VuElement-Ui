<template>
    <div class="player">
        <audio :src="mp3" ref="audio"></audio>
        <button @click="play" ref="hehe">点击播放</button>
        <button @click="stop">点击暂停</button>
        <button @click="bs">点击倍速</button>
        <button @click="ls">点击慢速</button>
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
export default {
    data () {
        return {
            mp3:'https://webfs.yun.kugou.com/202005242310/9fc42a3b1f2978253f72550a581564d0/G148/M07/1C/14/1A0DAFwDrPGAFsVlAD83-eBHT_w602.mp3',
            width:0,
        }
    },
    methods: {
    play(){
        return
        this.$refs.audio.play()
        setInterval(() => {
            this.width = this.$refs.audio.currentTime/this.$refs.audio.duration*100+'%'
            console.log(this.$refs.audio.currentTime,this.$refs.audio.duration);
        }, 500);
    },
    stop(){
        this.$refs.audio.pause()
        console.log();
    } ,
    bs(){
       this.$refs.audio.playbackRate += 1.5;
    },
    ls(){
        this.$refs.audio.playbackRate -= 1.5;
    }
    },
    mounted () {
        this.$refs.audio.autostart = true
        this.$refs.audio.autoplay = true;
        // this.$refs.hehe.click()        
    }
}
</script>
<style lang="scss">
    .player{
        height: 800px;
    }
</style>