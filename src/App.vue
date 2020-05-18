<template>
  <div id="picker">
    <div id="nav">
      <div>value:{{value}}</div>
      <lb-pagination
        :total="total"
        :pageLimit.sync="limit"
        :pageCount="pageCount"
        :pageIndex.sync="pageIndex"
        @pageIndexChange="pageIndexChange"
        @pageLimitChange="pageLimitChange"
      ></lb-pagination>
      <!-- <lb-input type="textarea" v-model="value" @blur="blur" @focus="focus" @input="inputs" @change="change"  resize="horizontal"/>
      -->
      <lb-input v-model="value" />
          <lb-switch
      v-model="value"
      :custom-value="{ on: 1, off: 0 }"
      flag-color="whites"
      @change="change"
      switchWitch="50px"
    >
      <template #on>开启</template>
      <template #off>关闭</template>
    </lb-switch>
    </div>
  </div>
</template>
<script>
var Dates = new Date();
export default {
  data() {
    return {
      value: 1,
      click: "mousemove",
      pageIndex: 1,
      limit: 10,
      pageCount: 7,
      total: 1001
    };
  },
  methods: {
    blur(ev) {
      console.log(ev, "blur");
    },
    focus(ev) {
      console.log(ev, "focus");
    },
    inputs(ev) {
      console.log(ev, "inputs");
    },
    change(ev) {
      console.log(ev, "change");
    },
    pageIndexChange(val){
      console.log(val,'pageIndexChange');
    },
    pageLimitChange(val){
        console.log(val,'pageLimitChange');
    },
  },
  mounted() {}
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>

