<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
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

