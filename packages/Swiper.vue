<template>
  <div
    ref="lbSwiper"
    class="lb-swiper-box"
    :class="[`lb-swiper_${childrenMode}`]"
    :style="{ height: heightStyle }"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <slot></slot>
    <div class="left" @click="arrow(true)" v-if="showAllow">
      <i
        :class="childrenMode == 'vertical' ? 'lb-icon-shangjiantou' : 'lb-icon-zuo'"
      ></i>
    </div>
    <div class="right" @click="arrow(false)" v-if="showAllow">
      <i :class="childrenMode == 'vertical' ? 'lb-icon-xiajiantou' : 'lb-icon-you'"></i>
    </div>
    <ul class="circle-box" v-if="showPoint">
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
    height: {
      type: [Number,String],
      default: 300
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    slide: {
      type: Boolean,
      default: false
    },
    showAllow: {
      type: Boolean,
      default: true
    },
    showPoint: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    mode: {
      type: String,
      default: 'horizontal'
    },
  },
  data() {
    return {
      children: [],
      childrenLength: 0,
      activeIndex: 0,
      reverse: false,
      timer: null,
      finish: true,
      timeOut: null,
      clientWidth: 0
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
        }, 300);
      }
    },
    mouseEnter() {
      clearInterval(this.timer);
      this.timer = null;
    },
    mouseLeave() {
      this.autoPlay && this.default();
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
    autoPlay: {
      handler(isplay) {
        if (isplay) {
          this.$nextTick(() => {
            this.default();
          });
        } else {
          clearInterval(this.timer);
          this.timer = null;
        }
      },
      immediate: true
    }
  },
  computed: {
    heightStyle() {
      let height = `${this.height}`.match(/\d*/g)[0];
      return height === '' ? '0px' : `${height}px`
    },
    childrenMode(){
      if(this.mode === 'vertical'){
          return this.slide?'horizontal':'vertical'
      }else{
        return 'horizontal'
      }
    }
  },
  mounted() {
    this.children = this.$children.filter(
      e => e.$options.name === "lb-swiper-item"
    );
    this.childrenLength = this.children.length - 1;
    this.$nextTick(() => {
      this.clientWidth = this.$refs.lbSwiper.clientWidth;
    })
        window.addEventListener('resize',()=>{
      this.clientWidth = this.$refs.lbSwiper.clientWidth;
    })
  },
  beforeDestroy() {
    this.mouseEnter();
    clearTimeout(this.timeOut);
    this.timeOut = null;
  }
};
</script>
