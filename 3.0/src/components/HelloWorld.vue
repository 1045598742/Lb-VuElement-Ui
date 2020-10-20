<template>
  <div>
    <div>我是helloWord组件</div>
    <button @click="change">点击事件</button>
    <teleport to="body" disabled>
      <div v-if="show">
        这是新组件
      </div>
    </teleport>
    <SunZi v-on="{ ...$attrs }" />
  </div>
</template>
<script>
import SunZi from './SunZi'
import { onMounted, getCurrentInstance, watchEffect, watch } from 'vue';

export default {
  components: {
    SunZi
  },
  data () {
    return {
      show: false 
    }
  },
  props: ['str'],
  setup(props, context) {
    function change() {
      context.emit('update:str', props.str + 1)
    }
    return {
      change
    }
  }
};
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
