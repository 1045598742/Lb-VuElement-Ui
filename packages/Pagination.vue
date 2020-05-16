<template>
  <div class="lb-pagination" ref="lb-pagination">
    <!-- 下拉每页条数 -->
    <div class="lb-pagination_limit-list" ref="limit" v-if="layoutShowObject.limit">
      <lb-select v-model="limitSelectValue">
        <lb-option
          v-for="limit in limitOption.map(Number)"
          :key="limit"
          :label="`${limit}条/页`"
          :value="limit"
        ></lb-option>
      </lb-select>
    </div>
    <!-- 后退按钮 -->
    <span
      ref="prev"
      v-if="layoutShowObject.prev"
      class="lb-pagination_prev"
      :class="{disable:pageIndex==1}"
      @click="prevOrNextClick(false)"
    >
      <i class="lb-icon-houtui"></i>
    </span>
    <!-- 页码盒子 -->
    <ul class="lb-pagination_page-index-box" @click="pageClick" ref="page" v-if="layoutShowObject.page">
      <!-- 第一条 -->
      <li class="lb-pagination_page-every" :class="{active:pageIndex==1}" :index="1">1</li>
      <!-- 前省略 -->
      <li
        class="lb-pagination_page-every lb-pagination_page-prevEllipsis"
        v-show="prevEllipsis"
        @click="emitEvent('pageIndex',pageIndex-length)"
      >...</li>
      <!-- 中间的循环页码 -->
      <li
        class="lb-pagination_page-every"
        v-for="index in pageMiddleList"
        :key="index"
        :class="{active:pageIndex==index}"
        :index="index"
      >{{ index }}</li>
      <!-- 后省略 -->
      <li
        class="lb-pagination_page-every lb-pagination_page-nextEllipsis"
        v-show="nextEllipsis"
        @click="emitEvent('pageIndex',pageIndex+length)"
      >...</li>
      <!-- 最后一条的页码 -->
      <li
        class="lb-pagination_page-every"
        v-show=" maxPageIndex> 1"
        :class="{active:pageIndex==maxPageIndex}"
        :index="maxPageIndex"
      >{{ maxPageIndex }}</li>
    </ul>
    <!-- 前进按钮 -->
    <span
      ref="next"
      v-if="layoutShowObject.next"
      class="lb-pagination_next"
      :class="{disable:pageIndex==maxPageIndex}"
      @click="prevOrNextClick(true)"
    >
      <i class="lb-icon-qianjin"></i>
    </span>
    <!-- total盒子 -->
    <span ref="total" v-if="layoutShowObject.total" class="lb-pagination_total">共 {{total}} 条</span>
    <!-- 页面切换盒子 -->
    <div ref="go" v-if="layoutShowObject.go" class="lb-pagination_step-number">
      <span>前往</span>
      <lb-input
        :key="key"
        type="number"
        min="1"
        :max="maxPageIndex"
        :value="pageIndex"
        @blur="pageIndexChange"
        @keyup.enter.native="pageIndexChange"
      ></lb-input>
      <span>页</span>
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
    pageLimit: {
      // 每页条数
      type: Number,
      default: 10
    },
    pageIndex: {
      // 当前页码
      type: Number,
      default: 1
    },
    pageCount: {
      // 显示的页码的数量
      type: Number,
      default: 7
    },
    limitOption: {
      // 显示的页码的数量
      type: Array,
      default: () => {
        return [10, 20, 30, 50];
      }
    },
    layout: {
      // 页面布局
      type: Array,
      default: () => {
        return ["limit", "prev", "page", "next", "go", "total"];
      }
    }
  },
  mounted() {
    this.layoutFormat();//处理页面布局
  },
  data() {
    return {
      limitSelectValue: this.pageLimit,
      prevEllipsis: false,
      nextEllipsis: false,
      length: 0,
      key: 0
    };
  },
  watch: {
    limitSelectValue(newValue) {
      // 每页条数变化
      this.emitEvent("pageLimit", +newValue);
    }
  },
  computed: {
    pageMiddleList() {
      //中间循环的页码
      const arr = [];
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.length =  // 判断省略号省略的数量
        this.maxPageIndex > this.pageCount
          ? this.pageCount - 2
          : this.maxPageIndex - 1; //要渲染的数量
      // 下面是处理中间页码循环的数组
      let min = 2;
      let max =
        this.maxPageIndex > this.length ? this.length + min : this.maxPageIndex;
      if (this.maxPageIndex <= this.pageCount) {
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
      this.prevEllipsis = min > 2; // 是否显示后退省略号
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.nextEllipsis = max <= this.maxPageIndex - 1 && this.maxPageIndex > 1; // 是否显示前进省略号
      for (let i = min; i < max; i++) {
        arr.push(i);
      }
      return arr;
    },
    maxPageIndex() {
      // 计算最大页码
      let max = Math.ceil(this.total / this.pageLimit);
      if (max < this.pageIndex) {
        // 页码最大值比当前页码小 说明是改了每页条数，重新赋值
        this.emitEvent("pageIndex", max);
      }
      return max;
    },
    layoutShowObject(){
      // 显示出来的布局集合
      return this.layout.reduce((defaultObj,item)=>(defaultObj[item] = true,defaultObj),{})
    }
  },
  methods: {
    layoutFormat() {
      if (this.layout.toString() === "limit,prev,page,next,go,total") return; //如果传入的数值和初始值一样不需要操作DOM
      this.layout.forEach(layoutName => {
        // 移动布局
        const layoutDom = this.$refs[layoutName];
        layoutDom && this.$refs["lb-pagination"].appendChild(layoutDom); // 移动布局
      });
    },
    pageClick(ev) {
      //点击页码事件
      const node = ev.target;
      if (node.tagName != "LI") return;
      const num = +node.getAttribute("index");
      if(num==this.pageIndex)return;
      num && this.emitEvent("pageIndex", num);
    },
    prevOrNextClick(flag) {
      // flag 判断前进还是后退 true 前进 flase 后退
      if (!this.maxPageIndex) return;
      let num = 0;
      let emitValue;
      if (flag) { //点击前进
        num = this.pageIndex + 1; 
        if (num > this.maxPageIndex) return; // 如果比最大页码还大 不需要emit
        emitValue = num ;
      } else { // 点击后退
        num = this.pageIndex - 1;
        if (num < 1) return; // 如果比最小页码还小 不需要emit
        emitValue = num;
      }
      this.emitEvent("pageIndex", emitValue);
    },
    pageIndexChange(ev) {
      // 页码输入框数据变化的回调
      const num = Number(ev.target.value);
      if (num === this.pageIndex) return; // 如果和当前页码相同 不需要继续操作
      const maxPageIndex = this.maxPageIndex;
      if ((this.pageIndex === maxPageIndex && num >= maxPageIndex) || !num) // 如果清空输入框或者输入值比最大页码大的话 让输入框刷新渲染
        return this.key++;
      this.emitEvent(
        "pageIndex",
        num && num > 0 ? (num <= maxPageIndex ? num : maxPageIndex) : 1
      );
    },
    emitEvent(eventName, num) {
      // 传值到父组件
      const { pageIndexChange, pageLimitChange } = this.$listeners;
      const parentEventList = {
        pageIndex: num => {
          pageIndexChange && pageIndexChange(num);
        },
        pageLimit: num => {
          pageLimitChange && pageLimitChange(num);
        }
      };
      this.$emit(`update:${eventName}`, num); 
      parentEventList[eventName](num);
    }
  }
};
</script>
