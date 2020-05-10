<template>
  <div class="lb-swiper-box" :style="{height:`${height}px`}" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <slot></slot>
    <div class="left" @click="arrow(true)"></div>
    <div class="right" @click="arrow(false)"></div>
    <ul class="circle-box">
      <li
        class="circle"
        @mouseenter="circleEnter(index - 1)"
        v-for="index in childrenLength + 1"
        :key="index"
        :class="{ activeCircle: index - 1 == activeIndex }"
      ></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "lb-swiper",
  props: {
    height:{
      type:Number,
      default:400,
    },
    autoPlay:{
      type:Boolean,
      default:true,
    },
    interval:{
      type:Number,
      default:3000,
    }
  },
  data() {
    return {
      children: [],
      childrenLength: 0,
      activeIndex: 0,
      reverse: false,
      timer: null,
      finish: true,
      timeOut: null
    };
  },
  methods: {
    default() {
      
      clearInterval(this.timer);
      this.timer = null;
      if (this.childrenLength) {
        this.timer = setInterval(() => {
          if (this.reverse) this.reverse = false;
          if (this.activeIndex < this.childrenLength) {
            this.activeIndex++;
          } else {
            this.activeIndex = 0;
          }
        }, this.interval);
      }
    },
    arrow(reverse) {
      if (this.finish) {
        this.finish = false;
        this.reverse = reverse;
        this.$nextTick(() => {
          if (reverse) {
            this.activeIndex =
              this.activeIndex <= 0
                ? this.childrenLength
                : this.activeIndex - 1;
          } else {
            this.activeIndex =
              this.activeIndex >= this.childrenLength
                ? 0
                : this.activeIndex + 1;
          }
        });
        this.timeOut = setTimeout(() => {
          this.finish = true;
        }, 500);
      }
    },
    mouseEnter() {
      clearInterval(this.timer);
      this.timer = null;
    },
    mouseLeave() {
      this.$nextTick(() => {
        this.default();
      });
    },
    circleEnter(index) {
      if (index == this.activeIndex) return;
      this.reverse = index < this.activeIndex;
      this.$nextTick(() => {
        this.activeIndex = index;
      });
    }
  },
  watch: {
    autoplay:{
      handler(isplay){
        if(isplay){
          this.default()
        }else{
           clearInterval(this.timer);
      this.timer = null;
        }
      },
       immediate: true
    }
  },
  mounted() {
    this.children = this.$children.filter(
      e => e.$options.name === "swiperItem"
    );
    this.childrenLength = this.children.length - 1;
  },
  beforeDestroy() {
    this.mouseEnter();
    clearTimeout(this.timeOut);
    this.timeOut = null;
  }
};
</script>
<style lang="scss">
.lb-swiper-box {
  margin: auto;
  width: 100%;
  position: relative;
  overflow: hidden;
  &:hover {
    .left {
      left: 10px;
      opacity: 0.5;
    }
    .right {
      right: 10px;
      opacity: 0.5;
    }
  }
  .swiper-item {
    position: absolute;
    top: 0;
    left: 0;
  }
  .swiper-item.show {
    z-index: 1;
  }
  .left {
    left: -50px;
  }
  .right {
    right: -50px;
  }
  .left,
  .right {
    z-index: 2;
    transition: all 0.5s;
    opacity: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: white;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .circle-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    bottom: 20px;
    left: 50%;
    z-index: 2;
    transform: translateX(-50%);
  }
  .circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 5px;
    background: white;
  }
  .activeCircle {
    background: orange;
  }
}
</style>
