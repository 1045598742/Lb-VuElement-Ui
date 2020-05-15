<template>
  <div id="picker">
    <div id="nav">
      <div class="transform">
        <div class="inner"></div>
      </div>
      <!-- <button @click="show = !show">点击{{value}}</button>
      <lb-date-picker v-model="value"></lb-date-picker> -->
      <div style="width:900px;margin:auto">
        <lb-swiper autoPlay slide v-if="false">
          <lb-swiper-item class="demo-item">
            1
            <!-- <img src="../src/assets/1.jpg" alt=""> -->
          </lb-swiper-item>
          <lb-swiper-item class="demo-item">
            2
            <!-- <img src="../src/assets/2.jpg" alt=""> -->
          </lb-swiper-item>
          <lb-swiper-item class="demo-item">
            3
            <!-- <img src="../src/assets/3.jpg" alt=""> -->
          </lb-swiper-item>
          <lb-swiper-item class="demo-item">
            4
            <!-- <img src="../src/assets/1.jpg" alt=""> -->
          </lb-swiper-item>
          <lb-swiper-item class="demo-item">
            5
            <!-- <img src="../src/assets/2.jpg" alt=""> -->
          </lb-swiper-item>
          <lb-swiper-item class="demo-item">
            6
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
.demo-item:nth-child(2n) {
  background-color: #99a9bf;
}

.demo-item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
body {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #000;
  perspective: 1200px;
}
ul {
  list-style: none;
  position: absolute;
  width: 400px;
  height: 200px;
  margin: -100px 0 0 -200px;
  transform-style: preserve-3d;
  animation: move 20s linear infinite;
  transform: scale(0.2);
  /* transform: rotateX(90deg); */
}

ul li {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0.5;
  font-size: 66px;
  text-align: center;
  line-height: 200px;
}

ul li img {
  width: 100%;
  height: 100%;
}

/* ============================================================== */

ul li:nth-child(1) {
  background-color: red;
  transform: translateX(600px) rotateY(90deg);
}

ul li:nth-child(2) {
  background-color: orange;
  transform: translateZ(600px);
}
ul li:nth-child(3) {
  background-color: yellow;
  transform: translateZ(425px) translateX(425px) rotateY(45deg);
}

ul li:nth-child(4) {
  background-color: green;
  transform: translateZ(425px) translateX(-425px) rotateY(-45deg);
}

ul li:nth-child(5) {
  background-color: cyan;
  transform: translateZ(-425px) translateX(-425px) rotateY(45deg);
}

ul li:nth-child(6) {
  background-color: blue;
  transform: translateZ(-425px) translateX(425px) rotateY(-45deg);
}
ul li:nth-child(7) {
  background-color: purple;
  transform: translateZ(-600px);
}

ul li:nth-child(8) {
  background-color: white;
  transform: translateX(-600px) rotateY(-90deg);
}

// .transform{
//   height: 500px;
//   width: 500px;
//   margin: -250px 0 0 -250px;
//   background: none;
//   transform-style: preserve-3d;
//   perspective: 500px;

//   .inner{
//     width: 200px;
//     height: 200px;
//     background:rgb(99, 97, 93);
//     transform: translateZ(-425px) translateX(-425px) rotateY(45deg);
//   }
// }
</style>

