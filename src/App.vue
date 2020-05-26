<template>
  <div id="app">
    <!-- <lb-tree :data="arr" @nodeClick="nodeClick" :option="{label:'name',children:'cList'}"></lb-tree>
    <lb-rate v-model="value"></lb-rate>-->
    <!-- <button @click="visible=!visible">11</button>
    <lb-dialog :visible.sync="visible">
      <div>这是一段测试文字</div>
      <div>这是一段测试文字</div>
      <div>这是一段测试文字</div>
      <div>这是一段测试文字</div>
      <div>这是一段测试文字</div>
      <div>这是一段测试文字</div>
       <template #footer>
         <lb-button type="success">success</lb-button>
       </template>
    </lb-dialog>-->
    <!-- <lb-progress v-model="value"></lb-progress> -->
    <router-view></router-view>
  </div>
</template>
<script>
import lbprogress from './views/progress'
var Dates = new Date();
export default {
  data() {
    return {
  
      value: 0,
      visible: false
    };
  },
  methods: {
    nodeClick(val, other) {
      console.log(val, other);
    },
    input(val){
      console.log('input');
    },
    change(val){
      console.log('change');
    }
  },
  mounted() {
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
body,html{
  height: 100%;
}
#app {
  height: 100%;
  // background: black;
  // width: 60px;
  // height: 60px;
  // overflow: hidden;
  // .list{
  //   width: 100px;
  //   height: 200px;
  //   overflow: hidden;
  // }

}
</style>

