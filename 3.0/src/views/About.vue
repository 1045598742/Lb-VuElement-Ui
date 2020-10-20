<template>
  <div class="about">
    <LbSelect v-model="selectValue">
      <LbOption
        v-for="(option, index) in options"
        :key="index"
        :label="option.label"
        :value="option.value"
      />
    </LbSelect>
  </div>
</template>

<script>
import LbSelect from '../components/Select/index.vue'
import LbOption from '../components/Select/option.vue'
import { reactive, ref } from 'vue'
export default {
  components: {
    LbSelect,
    LbOption
  },
  setup() {
    const selectValue = ref('66')
    const options = reactive([
      { label: '李博', value: 1 },
      { label: '王洪', value: 2 },
      { label: '张三', value: 3 },
      { label: '王洪', value: 2 },
      { label: '张三', value: 3 },
      { label: '王洪', value: 2 },
      { label: '张三', value: 3 },
      { label: '王洪', value: 2 },
      { label: '张三', value: 3 },
      { label: '王洪', value: 2 },
      { label: '张三', value: 3 },
      { label: '王洪', value: 2 },
      { label: '张三', value: 3 },
      { label: '666', value: 2 },
    ])
    return {
      selectValue,
      options
    }
  }
}
</script>
