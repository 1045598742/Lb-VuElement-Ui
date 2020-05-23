<template>
  <div id="app">
    <!-- <lb-tree :data="arr" @nodeClick="nodeClick" :option="{label:'name',children:'cList'}"></lb-tree>
    <lb-rate v-model="value"></lb-rate> -->
    <button @click="visible=!visible">11</button>
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
    </lb-dialog>
  </div>
</template>
<script>
var Dates = new Date();
export default {
  data() {
    return {
      arr:[
        {
          id:0,
          name:"0",
          cList:[
            {
            id:1,
            name:"0-1",
            },
            {
            id:2,
            name:"0-2",
            cList:[
              {
              id:5,
              name:"2-1",
              },
              {
              id:6,
              name:"2-2",
              },
            ]
            },
            {
            id:3,
            name:"0-3",
            },
            {
            id:4,
            name:"0-4",
            },
          ]
        }
      ],
      value:0,
      visible:false
    };
  },
  methods: {
    nodeClick(val,other){
      console.log(val,other);
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
#app{
  width: 60px;
  height: 60px;
  overflow: hidden;
}
</style>

