<template>
  <div id="app" class="dd">
    <lb-input type="textarea" v-model="inputs" placeholder="请输入密码" clearable></lb-input>
    <button @click="click">点我</button>
    <!-- 下拉 -->
    <lb-select v-model="valuesd">
      <lb-option
        v-for="item in option"
        :key="item.id"
        :label="item.label"
        :value="item.value"
      ></lb-option>
    </lb-select>

      <lb-button type="warning"> warning </lb-button>
          <lb-swiper autoPlay>
            <lb-swiper-item class="swiper-item_demo">1</lb-swiper-item>
            <lb-swiper-item class="swiper-item_demo">2</lb-swiper-item>
            <lb-swiper-item class="swiper-item_demo">3</lb-swiper-item>
          </lb-swiper>
     <!-- 按钮 -->
    <!-- <lb-button> default </lb-button>
    <lb-button type="success"> success </lb-button>
    <lb-button type="danger"> danger </lb-button>
    <lb-button type="info"> info </lb-button>
    <lb-button type="primary"> primary </lb-button>
    <lb-button type="primary" round> primary </lb-button>
    <lb-button type="danger" circle icon="lb-icon-star"></lb-button>
    <lb-button type="danger" icon="lb-icon-star" plant>plant</lb-button>
    <lb-button  disabled>plant</lb-button> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputs:'1',
      show: false,
      a: 1,
      valuesd: 0,
      option: [
        { label: "李博", value: 0 },
        { label: "李博1", value: 1 },
        { label: "李博1", value: 2 },
        { label: "李博1", value: 3 },
        { label: "李博1", value: 4 },
      ],
      codeStr2: `
          <div>默认按钮</div>
          <w-button icon="settings">默认按钮</w-button>
          <w-button :loading="true">默认按钮</w-button>
          <w-button disabled>默认按钮</w-button>
        `
    };
  },
  methods: {
    click() {
      this.show = !this.show;
    },
    selectClick(ev) {
      const target = ev.target;
      if (target.tagName == "LI") {
        const index = target.getAttribute("index");
        this.value = this.a;
      }
    },
    beforeEnter(el) {
      //  console.dir(el);
      el.style.height = 0;
    },
    enter(el) {
      el.style.height = el.scrollHeight + "px";
      el.style.overflow = "hidden";
    },
    afterEnter(el) {
      el.style.overflow = "";
    },
    beforLeave(el) {
      // el.style.height = el.scrollHeight + 'px';
    },
    leave(el) {
      el.style.overflow = "hidden";
      el.style.height = 0;
    },
    afterLeave(el) {
      el.style.overflow = "";
      el.style.height = "";
    },
  },
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.swiper-item_demo{
  background: red;
}
.html{
  color: red;
}
#app {
  li {
    list-style: none;
  }
}
</style>