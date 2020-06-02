<template>
    <div>
        <lb-clip-image @finish="finish" :maxWidth="750" :maxHeight="750"></lb-clip-image>
        <div v-for="(item, index) in imgList" :key="index" >
            <img :src="item" alt />
        </div>
        
    </div>
</template>
<script>
export default {
    data () {
        return {
            imgList:[]
        }
    },
    methods: {
        finish(val){
            console.log(val);
            this.imgList = val
        }
    }
}
</script>
<style lang="scss" scoped>
    img{
        // display: block;
        display: inline-block;
        font-size: 0;
        vertical-align: top;
    }
</style>