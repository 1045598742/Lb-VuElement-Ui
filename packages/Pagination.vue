/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
  <div class="lb-pagination">
    <!-- <el-pagination background layout="prev, pager, next" :total="200"></el-pagination> -->
    <div class="flex-box">
      <!-- 后退按钮 -->
      <span class="prev" @click="hehe(false)">《</span>
      <ul class="page-box" @click="pageClick">
        <!-- 第一条 -->
        <li :class="{active:pageIndex==1}" :index="1">1</li>
        <!-- 前省略 -->
        <li
          class="prev"
          v-show="prevEllipsis"
          @click="$emit('update:pageIndex',pageIndex-length)"
        >...</li>
        <!-- 中间的循环页码 -->
        <li
          v-for="index in pageArr"
          :key="index"
          :class="{active:pageIndex==index}"
          :index="index"
        >{{ index }}</li>
        <!-- 后省略 -->
        <li
          class="next"
          v-show="nextEllipsis"
          @click="$emit('update:pageIndex',pageIndex+length)"
        >...</li>
        <!-- 最后一条的页码 -->
        <li
          v-show=" maxPageIndex> 1"
          :class="{active:pageIndex==maxPageIndex}"
          :index="maxPageIndex"
        >{{ maxPageIndex }}</li>
      </ul>
      <!-- 前进按钮 -->
      <span class="next" @click="hehe(true)">》</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "lb-pagination",
  props: {
    total: {
      // 总条数
      type: Number,
      default: 80
    },
    limit: {
      // 每页条数
      type: Number,
      default: 10
    },
    pageIndex: {
      // 当前页码
      type: Number,
      default: 1
    },
    pagerCount: {
      // 显示的页码的数量
      type: Number,
      default: 7
    }
  },
  data() {
    return {
      prevEllipsis: false,
      nextEllipsis: false,
      length: 0
    };
  },
  computed: {
    pageArr() {
      //中间循环的页码
      const arr = [];
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.length =
        this.maxPageIndex > this.pagerCount
          ? this.pagerCount - 2
          : this.maxPageIndex - 1; //要渲染的数量

      let min = 2;
      let max =
        this.maxPageIndex > this.length ? this.length + min : this.maxPageIndex;
      if (this.maxPageIndex <= this.pagerCount) {
        max = this.maxPageIndex;
      } else {
        const lengthMiddle = Math.floor(this.length / 2);
        // const middleIndex = Math.floor(this.maxPageIndex / 2); //获取中间值
        if (this.length > 0) {
          if (this.pageIndex - lengthMiddle > lengthMiddle) {
            min = this.pageIndex - lengthMiddle;
            max = min + this.length;
          }
          if (this.maxPageIndex - lengthMiddle <= this.pageIndex) {
            max = this.maxPageIndex;
            min = max - this.length;
          }
        } else {
          min = max = 0;
        }
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.prevEllipsis = min > 2;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.nextEllipsis = max <= this.maxPageIndex - 1 && this.maxPageIndex > 1;

      for (let i = min; i < max; i++) {
        arr.push(i);
      }
      return arr;
    },
    maxPageIndex() {
      return Math.ceil(this.total / this.limit);
    }
  },
  methods: {
    pageClick(ev) {
      //点击页码事件
      const node = ev.target;
      if (node.tagName != "LI") return;
      const num = node.getAttribute("index");
      num && this.$emit("update:pageIndex", +num);
    },
    hehe(flag) {
      if (!this.maxPageIndex) return;
      let num = 0;
      let emitValue;
      if (flag) {
        num = this.pageIndex + 1;
        emitValue = num < this.maxPageIndex ? num : this.maxPageIndex;
      } else {
        num = this.pageIndex - 1;
        emitValue = num < 1 ? 1 : num;
      }
      this.$emit("update:pageIndex", emitValue);
    }
  }
};
</script>
<style lang="scss">
.lb-pagination {
  .flex-box {
    display: inline-flex;
    vertical-align: middle;
    margin-top: 50px;
  }
  .page-box {
    display: flex;
    justify-content: center;
  }
  .prev,
  .next,
  li {
    cursor: pointer;
    color: white;
    height: 50px;
    width: 50px;
    line-height: 50px;
    background: blueviolet;
    text-align: center;
    border-radius: 4px;
    margin: 0 5px;
  }
  li {
    &.active {
      user-select: none;
      background: skyblue;
      color: red;
    }
  }
}
</style>
