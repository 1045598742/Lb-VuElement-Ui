<template>
  <div class="home">
    <div ref="box">{{ name}}</div>
    <button @click="stateChange">点击改变store</button>
    <HelloWorld @hehe="hehe" @haha="haha" />
  </div>
</template>

<script>
// import HelloWorld from '../components/HelloWorld'
// import Functional from '../components/Functional'
import {
  ref, reactive, triggerRef, unref, toRaw, watchEffect, toRef, toRefs, computed, watch, shallowReactive,
  shallowRef, markRaw, onMounted, getCurrentInstance, defineAsyncComponent, isRef, isReactive, h
} from 'vue'

import { useRouter, useRoute, useLink, RouterLink, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

export default {
  name: 'Home',
  components: {
    HelloWorld: defineAsyncComponent(
      {
        loader: async () => {
          const fn = function() {
            return new Promise((resolve, reject) => {
              setTimeout(resolve, 0)
            })
          }
          await fn()
          return import('../components/HelloWorld')
        },
        loadingComponent: {
          render() {
            return h('h1', { style: { color: 'blue' } }, '加载中')
          }
        },
        errorComponent: {
          render() {
            return h('h1', { style: { color: 'red' } }, '加载失败')
          }
        },
        delay: 200,
        timeout: 2100,
      }
    )
  },
  setup(prop, context) {
    const { navigate } = useLink({ ...RouterLink.props, to: '/about' })
    const instance = getCurrentInstance()
    let obj = { name: 'a', age: 20 }
    const state = toRefs(reactive(obj))
    function stateChange() {
        state.name = 'b'
        state.age = 30
    }
    const str = ref('11111111111111')
    function change(option) {
      console.log(option);
    }

    function hehe() {
      alert('hehe')
    }
    function haha() {
      alert('haha')
    }
    return {
      str,
      ...state,
      stateChange,
      change,
      hehe,
      haha
    }
  }
}
</script>
<style lang="scss">
  .img {
    pointer-events: none;
  }
</style>

