<template>
  <transition name="lb-swiper" v-if="$parent.$options.name==='lb-swiper'">
    <div class="lb-swiper-item" v-show="isShow" :class="{reverse: reverse,show: isShow}">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default {
  name: "lb-swiper-item",
  data() {
    const children = this.$parent.$children.filter(
      e => e.$options.name === "lb-swiper-item"
    );
    return {
      index: children.length - 1
    };
  },
  computed: {
    isShow() {
      return this.$parent.activeIndex === this.index;
    },
    reverse: {
      get() {
        return this.$parent.reverse === true;
      }
    }
  }
};
</script>