<template>
  <div class="lb-swiper-box" :style="{height:`${height}px`}" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <slot></slot>
    <div class="left" @click="arrow(true)"><i class="lb-icon-zuo"></i></div>
    <div class="right" @click="arrow(false)"><i class="lb-icon-you"></i></div>
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
      default:300,
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
      e => e.$options.name === "lb-swiper-item"
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
