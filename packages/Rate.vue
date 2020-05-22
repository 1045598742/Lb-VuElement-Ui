<template>
  <div class="lb-rate">
    <span
      class="lb-rate_every"
      :class="{disable}"
      v-for="i in max"
      :key="i"
      @click.capture="eventEntrance('rateChange',i)"
      @mouseenter.capture="eventEntrance('mouseenter',i)"
      @mouseleave="eventEntrance('mouseout')"
    >
      <i class="rate-outer" :class="[icon]">
        <i v-if="fraction[i-1]!='0%'" class="rate-inner" :class="[icon]" :style="{width:fraction[i-1],color}"></i>
      </i>
    </span>
    <span v-if="showText&&changeNum>0">{{rateText[Math.ceil(changeNum)-1]}}</span>
  </div>
</template>
<script>
export default {
  name: "lb-rate",
  props: {
    icon: {
      type: String,
      default: "lb-icon-allstar"
    },
    color: {
      type: String,
      default: "#FF9900"
    },
    value: {
      type: Number,
      default: 0
    },
    showText: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    rateText: {
      type: Array,
      default() {
        return ["垃圾", "较差", "一般", "凑合", "牛逼"];
      }
    },
    max: {
      type: Number,
      default: 5
    }
  },
  model: {
    prop: "value"
  },
  data() {
    return {
      changeNum: this.value
    };
  },
  methods: {
    eventEntrance(eventName, value) {
      if (this.disable) return;
      this[eventName](value);
    },
    rateChange(num) {
      this.$emit("input", num);
      if(num!=this.value){
         this.$emit('change',num)
      }
    },
    mouseenter(num) {
      this.changeNum = num;
    },
    mouseout() {
      this.changeNum = this.value;
    }
  },
  computed: {
    fraction() {
      let num = this.changeNum;
      let integer = parseInt(num);
      let float = num - integer;
      let arr = [];
      for (let i = 1; i <= this.max; i++) {
        if (integer >= i) {
          // 如果大于当前项 是100%
          arr.push("100%");
        } else {
          if (i > 1 && arr[i - 2] == "100%") {
            // 如果是第二个或者以上 说明是小数部分
            arr.push(`${float * 100}%`);
          } else {
            arr.push(i > 1 ? '0%' : `${float * 100}%`);
          }
        }
      }
      return arr;
    }
  }
};
</script>