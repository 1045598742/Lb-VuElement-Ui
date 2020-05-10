<template>
  <li class="lb-option" @click="selectClick" :class="{'lb-option-active':$parent.value===index}">{{label}} </li>
</template>
<script>
export default {
    name:'lb-option',
  props:['label','value'],
  data() {
    let length = this.$parent.$children.filter(e=>e.$options.name=="lb-option").length;
    return {
        index:length-1,
    };
  },
  methods: {
    selectClick(){
      this.$parent.$emit('input',this.value)
    }
  }
};
</script>
