<template>
  <transition name="fade">
    <div v-if="isShow" class="lb-carousel__item" :class="{ prev: $parent.operation === 'prev' }">
      <slot />
    </div>
  </transition>
</template>

<script>
import { computed, defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'

export default defineComponent({
  name: 'CarouselItem',
  setup(props) {
    const { ctx } = getCurrentInstance()
    const index = (ctx.$parent.childNum || 0)
    ctx.$parent.childNum = index + 1
    watch(() => ctx.$parent.activeIndex, (newValue) => {
      // console.log(newValue)
    })
    const isShow = computed(() => ctx.$parent.activeIndex === index)
    return {
      isShow
    }
  }
})
</script>

<style lang="scss">
  .lb-carousel {
    &__item {
      position: absolute;
      background-color: sandybrown;
      height: 100%;
      width: 100%;
      transition: all .3s ease-in-out;
    }
  }
  .fade-enter-from {
    transform: translateX(100%);
  }
  .fade-leave-to {
    transform: translateX(-100%);
  }
  .fade-enter-from.prev {
    transform: translateX(-100%);
  }
  .fade-leave-to.prev {
    transform: translateX(100%);
  }
  .fade-enter-avtive,.fade-leave-avtive {
    transition: all 3s ease-in-out;
  }
</style>
