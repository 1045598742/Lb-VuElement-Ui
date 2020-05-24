<template>
  <div id="picker-demo">
    <div class="list" ref="list">
      <ul class="inner" ref="inner">
        <li ref="every" :class="{active:activeIndex===i-1}" v-for="i in 60" :key="i">{{i-1}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: 0
    };
  },
  methods: {},
  mounted() {
    const { list, inner, every } = this.$refs;
    let { top, height } = list.getBoundingClientRect();
    let positionTop = top + (height - 30) / 2; //中间过滤框顶部据浏览器顶部的距离
    let positionBottom = positionTop + 30; //中间过滤框底部据浏览器顶部的距离
    inner.addEventListener("mouseleave", ev => {
      let arr = [...every].filter((e, i) => {
        let { top, height } = e.getBoundingClientRect();
        let bottom = top + height;
        return (
          (top >= positionTop && top <= positionBottom) ||
          (bottom <= positionBottom && bottom >= positionTop)
        );
      });
      arr.sort((a, b) => {
        return (
          Math.abs(a.getBoundingClientRect().top - positionTop) -
          Math.abs(b.getBoundingClientRect().top - positionTop)
        );
      });
      if (arr[0].getBoundingClientRect().top > positionTop) {
        inner.scrollTop += Math.abs(
          arr[0].getBoundingClientRect().top - positionTop
        );
      } else {
        inner.scrollTop -= Math.abs(
          arr[0].getBoundingClientRect().top - positionTop
        );
      }
      this.activeIndex = parseInt(arr[0].textContent);
    });
  }
};
</script>
<style lang="scss">
.list {
  width: 100px;
  height: 200px;
  // overflow: auto;
  margin: 50px auto 0;
  border: 1px solid red;
  box-sizing: border-box;
  position: relative;
  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 30px;
    // background: red;
    opacity: 0.2;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border: 1px solid orange;
    border-left: 0;
    border-right: 0;
    box-sizing: border-box;
    z-index: -1;
  }
  .inner {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    padding: 85px 0;
    li {
      height: 30px;
      text-align: center;
      line-height: 30px;
      // background: cornflowerblue;
      // border-bottom: 1px  solid white;
    }
  }
}
.active {
  color: yellowgreen;
  font-weight: bold;
}
</style>