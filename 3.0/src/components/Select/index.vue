<template>
  <div ref="select" class="lb-select">
    <input :value="modelValue" type="text" @click="showOption">
    <teleport to="body">
      <transition
        name="fade"
        @beforeEnter="beforeEnter"
        @enter="enter"
        @afterEnter="afterEnter"
        @beforLeave="beforLeave"
        @leave="leave"
        @afterLeave="afterLeave"
      >
        <div v-if="isMounted" v-show="innerShow" class="model">
          <slot></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  name: 'lb-select',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    const value = ref('')
    const isMounted = ref(false)
    const show = ref(false)
    const innerShow = ref(false)
    const select = ref(null)
    function beforeEnter(el) {
      const { width, height, top, left } = select.value.getBoundingClientRect()
      el.style.height = 0;
      // el.style.width = `${width}px`
      el.style.left = `${left}px`
      el.style.top = `${top + height}px`
    }
    function enter(el) {
      el.style.height = el.scrollHeight + "px";
      el.style.overflow = "auto";
    }
    function afterEnter(el) {
      el.style.overflow = "auto";
    }
    function beforLeave(el) {
      
    }
    function leave(el) {
        el.style.overflow = 'auto';
      el.style.height = 0;
    }
    function afterLeave(el) {
      el.style.overflow = "";
      el.style.height = "";
    }
    return {
      value,
      show,
      innerShow,
      select,
      beforeEnter,
      enter,
      afterEnter,
      beforLeave,
      leave,
      afterLeave,
      isMounted,
      showOption() {
        if (!isMounted.value) isMounted.value = true
        show.value = !show.value
        innerShow.value = !innerShow.value
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .lb-select {
    max-width: 200px;
    border: 1px solid red;
  }
  .model {
    max-height: 274px;
    min-width: 202px;
    // margin-right: -17px;
    // margin-bottom: -17px;
    background: green;
    transition:  height .15s ease-in-out;
    transform-origin: left top;
    position: absolute;
    z-index: 2000;
  }
  .fade-enter-from, .fade-leave-to {
    height: 0;
  }
</style>
