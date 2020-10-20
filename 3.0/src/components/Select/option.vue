<template>
  <div class="lb-option">{{ label }}</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: 'lb-option',
  props: [ 'label', 'value' ],
  setup(props, context) {
    return {
    }
  } 
})
</script>

<style scoped>
  .lb-option {
    color: white;
  }
</style>