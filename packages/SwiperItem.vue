<template>
  <transition
    :name="`lb-swiper_${childrenMode}`"
    v-if="$parent.$options.name === 'lb-swiper'"
  >
   <!-- show: (!isSilde ||  true) ? isShow : false, -->
   <!-- reverse: (!isSilde || true) ? reverse : false, -->
    <div
      class="lb-swiper-item"
      v-show="!$parent.slide? isShow: true"
      :style="isSilde &&childrenMode==='horizontal' ? style : ''"
      
      :class="{
        reverse: !isSilde?reverse:false,
        mainShow: $parent.activeIndex === index && childrenMode==='horizontal',
        transition: mounteded && isSilde&& childrenMode==='horizontal',
        'lb-swiper-item_slide': isSilde && childrenMode==='horizontal'
      }"
    >
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default {
  name: "lb-swiper-item",
  inheritAttrs: false,
  data() {
    const children = this.$parent.$children.filter(
      e => e.$options.name === "lb-swiper-item"
    );
    return {
      index: children.length - 1,
      mounteded: false,
      position: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.mounteded = true;
    })
  },
  computed: {
    isShow() {
      return this.$parent.activeIndex === this.index;
    },
    isSilde() {
      return this.$parent.slide === true;
    },
    reverse: {
      get() {
        return this.$parent.reverse === true;
      }
    },
    width() {
      return this.$parent.clientWidth
    },
    childrenMode(){
      return this.$parent.childrenMode
    },
    style() {
      let activeIndex = this.$parent.activeIndex; // 当前主显的索引
      let clientWidth = this.$parent.clientWidth; // 容器的宽度
      let mainWidth = clientWidth / 2;// 中间大盒子的宽度
      let width = mainWidth / 2; //主显轮播图距离左边的距离
      let smallWidth = (clientWidth / 2) * 0.8; // 两侧盒子的宽度
      let leftXWidth = - (mainWidth - smallWidth) / 2; //左侧图需要偏移的宽度
      let rightXWidth = clientWidth - smallWidth + leftXWidth; //右侧图需要偏移的位置
      let prev =
        activeIndex - 1 < 0
          ? this.$parent.childrenLength
          : activeIndex - 1;
      let prevPrev = prev - 1 < 0 ? this.$parent.childrenLength : prev - 1;
      let now = activeIndex;
      let next =
        activeIndex + 1 >= this.$parent.childrenLength + 1
          ? 0
          : activeIndex + 1;
      let nextNext = next + 1 >= this.$parent.childrenLength + 1 ? 0 : next + 1;
      let transform = "";
      let zIndex = 0;
      if (now === this.index) {
        //中间主要
        transform = `translateX(${width}px) scale(1)`;
        zIndex = 5;
      } else if (this.index == next) {
        //后一个
        transform = `translateX(${rightXWidth}px) scale(0.8)`;
        zIndex = this.position === "prev" && !this.reverse ? 3 : 4;
        this.position = "next";
      } else if (this.index == prev) {
        //前一个
        transform = `translateX(${leftXWidth}px) scale(0.8)`;
        zIndex = this.position === "next" && this.reverse ? 3 : 4;
        this.position = "prev";
      } else if (this.index == prevPrev) {
        //前两个
        transform = `translateX(${-mainWidth - leftXWidth}px) scale(0.8)`;
        zIndex = 1;
      } else if (this.index == nextNext) {
        //后两个
        transform = `translateX(${clientWidth + leftXWidth}px) scale(0.8)`;
        zIndex = 1;
      }
      else {
        transform = `translateX(${width}px) scale(0.8)`;
        zIndex = 0;
      }
      return {
        zIndex,
        transform

      };
    }
  }
};
</script>
<style lang="scss">
// .lb-swiper-item_slide {
//   display: inline-block !important;
//   vertical-align: middle !important;
//   box-sizing: border-box !important;
//   width: 50% !important;
//   height: 100% !important;
//   position: absolute !important;
//   left: 0 !important;
//   top: 0 !important;

//   // z-index: 1;
// }
.transition {
  transition: transform 0.4s ease-in-out;
}
.mainShow {
  z-index: 2;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%,-50%);
}
</style>