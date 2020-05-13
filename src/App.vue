<template>
  <div id="picker">
    <div id="nav">
      <button @click="show = !show">点击{{value}}</button>
      <lb-date-picker v-model="value"></lb-date-picker>
    </div>
  </div>
</template>
<script>
var Dates = new Date();
export default {
  data () {
    return {
      value:1589337094000
    }
  }
};
</script>

