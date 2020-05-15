<template>
  <div id="picker">
    <div id="nav">
      <button @click="show = !show">点击{{value}}</button>
      <lb-date-picker v-model="value"></lb-date-picker>
      <div style="width:900px;margin:auto" v-if="false">
          <lb-swiper slide>
        <lb-swiper-item class="demo-item">
          <img src="../src/assets/1.jpg" alt="">
        </lb-swiper-item>
        <lb-swiper-item class="demo-item">
          <img src="../src/assets/2.jpg" alt="">
        </lb-swiper-item>
        <lb-swiper-item class="demo-item">
          <img src="../src/assets/3.jpg" alt="">
        </lb-swiper-item>
        <lb-swiper-item class="demo-item">
          <img src="../src/assets/1.jpg" alt="">
        </lb-swiper-item>
        <lb-swiper-item class="demo-item">
          <img src="../src/assets/2.jpg" alt="">
        </lb-swiper-item>
        <lb-swiper-item class="demo-item">
          <img src="../src/assets/3.jpg" alt="">
        </lb-swiper-item>
      </lb-swiper>
      </div>
    
    </div>
  </div>
</template>
<script>
var Dates = new Date();
export default {
  data () {
    return {
      value:1589337094000
    }
  }
};
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
    .demo-item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .demo-item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

