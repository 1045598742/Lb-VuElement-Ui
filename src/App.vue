<template>
  <div id="picker">
    <div id="nav">
      <div class="transform">
        <div class="inner"></div>
      </div>
      <!-- <button @click="show = !show">点击{{value}}</button>
      <lb-date-picker v-model="value"></lb-date-picker> -->
      <div style="width:820px;margin:auto" >
        <lb-swiper autoPlay slide :height="200">
          <lb-swiper-item class="demo-item">
            <img src="../src/assets/111.jpg" alt="">
            <!-- <img src="../src/assets/1.jpg" alt=""> -->
          </lb-swiper-item>
          <lb-swiper-item class="demo-item">
             <img src="../src/assets/222.jpg" alt="">
            <!-- <img src="../src/assets/2.jpg" alt=""> -->
          </lb-swiper-item>
          <lb-swiper-item class="demo-item">
             <img src="../src/assets/333.jpg" alt="">
            <!-- <img src="../src/assets/3.jpg" alt=""> -->
          </lb-swiper-item>
          <lb-swiper-item class="demo-item">
             <img src="../src/assets/ljj.jpg" alt="">
            <!-- <img src="../src/assets/1.jpg" alt=""> -->
          </lb-swiper-item>
          <lb-swiper-item class="demo-item">
             <img src="../src/assets/zbc.jpg" alt="">
            <!-- <img src="../src/assets/2.jpg" alt=""> -->
          </lb-swiper-item>
          <lb-swiper-item class="demo-item">
             <img src="../src/assets/lyj.jpg" alt="">
            <!-- <img src="../src/assets/3.jpg" alt=""> -->
          </lb-swiper-item>
        </lb-swiper>
      </div>
      <!-- <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul> -->
    </div>
  </div>
</template>
<script>
var Dates = new Date();
export default {
  data() {
    return {
      value: 1589337094000,
      click: 'mousemove'
    }
  },
  methods: {

  },
  mounted() {
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.demo-item{
  img{
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
.demo-item:nth-child(2n) {
  background-color: #99a9bf;
}

.demo-item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>

