<template>
  <div class="lb-date-picker" v-clickOutside>
    <lb-input type="text" :value="value" readonly @click.native="show=!show" />
    <transition name="picker">
      <ul class="lb-date-picker-popper" v-show="show" @click="popperClick">
        <li class="week-day">
          <span
            @click="yearSub"
            @mousedown="hehe('mousedown')"
            @mouseup="clearTimer"
            @mouseout="clearTimer"
          >
            <i class="lb-icon-houtui"></i>
          </span>
          <span @click="monthSub">
            <i class="lb-icon-zuo"></i>
          </span>
          <div>{{ year }} 年 {{ month }} 月</div>
          <span @click="monthAdd">
            <i class="lb-icon-you"></i>
          </span>
          <span @click="yearAdd">
            <i class="lb-icon-qianjin"></i>
          </span>
        </li>
        <li>
          <span v-for="index in day" :key="index">{{ index }}</span>
        </li>
        <li v-for="i in 6" :key="i">
          <span
            class="day-every"
            @click="dayClick(arr[7 * (i - 1) + j - 1])"
            v-for="j in 7"
            :key="j"
            :class="{
                  activeDate:arr[7 * (i - 1) + j - 1].type==='default' && dateActive.day===arr[7 * (i - 1) + j - 1].value,
                  notThisMonth:arr[7 * (i - 1) + j - 1].type!='default',
                  nowDay: nowDay(arr[7 * (i - 1) + j - 1])
                }"
          >{{ arr[7 * (i - 1) + j - 1].value }}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
var Dates = new Date();
export default {
    name:'lb-date-picker',
  props: ["dateValue"],
  model: {
    prop: "dateValue"
  },
  directives: {
    clickOutside: {
      bind(el, building, vnode) {
        let handler = ev => {
          if (!el.contains(ev.target)) {
            vnode.context.show = false;
          }
        };
        el.handler = handler;
        document.addEventListener("click", handler);
      },
      unbind(el, building, vnode) {
        document.removeEventListener("click", el.handler);
      }
    }
  },
  data() {
    return {
      value1: "",
      day: ["日", "一", "二", "三", "四", "五", "六"],
      year: Dates.getFullYear(),
      month: Dates.getMonth() + 1,
      date: Dates.getDate(),
      // arr: [],
      show: false,
      value: "",
      timer: null,
      dateActive: {
        year: null,
        month: null,
        day: null
      }
    };
  },
  methods: {
    hehe(title) {
      // this.timer = setInterval(() => {
      //   console.log(title);
      // }, 200);
    },
    click(ev) {
      if (ev.target.className.indexOf("lb-date-picker-popper") != -1) {
        return;
      }
      if (ev.target.getAttribute("clear") === "clear") {
        this.show = false;
        return;
      }
      this.show = !this.show;
    },
    popperClick(ev) {
      if (ev.target.className.indexOf("day-every") != -1) {
        this.show = false;
      }
    },
    clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    dayClick({ type, value }) {
      this.month = this.getMonth(type, value);
      this.value = `${this.year}-${this.month}-${value}`;
      Object.assign(this.dateActive, {
        year: this.year,
        month: this.month,
        day: value
      });
      this.$emit("input", new Date(`${this.year}-${this.month}-${value}`) / 1);
    },
    nowDay({ type, value }) {
      let month = this.getMonth(type);
      var nowDate = new Date();
      var nowyear = nowDate.getFullYear();
      var nowmonth = nowDate.getMonth() + 1;
      var nowdate = nowDate.getDate();
      return (
        `${nowyear}-${nowmonth}-${nowdate}` === `${this.year}-${month}-${value}`
      );
    },
    getMonth(type, value) {
      let month = null;
      switch (type) {
        case "default":
          month = this.month;
          break;
        case "prev":
          month = this.month - 1;
          break;
        case "next":
          month = this.month + 1;
          break;
      }
      return month;
    },
    yearAdd() {
      this.year += 1;
      // this.arr()
    },
    yearSub() {
      this.year -= 1;
      // this.arr()
    },
    monthAdd() {
      if (this.month < 12) {
        this.month += 1;
      } else {
        this.month = 1;
      }
      // this.arr()
    },
    monthSub() {
      if (this.month < 2) {
        this.month = 12;
      } else {
        this.month -= 1;
      }
      // this.arr()
    }
  },
  computed: {
    arr() {
      var arr = [];
      var prevArr = [];
      var newDate = new Date(`${this.year}-${this.month}-1`);
      var monthFirstDay = newDate.getDay() || 7;
      var monthFirstTimestamp = newDate.getTime();
      let num = 0;
      for (let i = monthFirstDay - 1; i < 42; i++) {
        let dayNum = new Date(monthFirstTimestamp + 86400000 * num).getDate();
        arr.push({
          type: num > 28 && dayNum <= 14 ? "next" : "default",
          value: dayNum
        });
        num++;
      }
      for (let i = 0; i <= monthFirstDay - 1; i++) {
        prevArr.unshift({
          type: "prev",
          value: new Date(monthFirstTimestamp - 86400000 * (i + 1)).getDate()
        });
      }
      return [...prevArr, ...arr];
    }
  },
  mounted() {
    // this.arr()
  }
};
</script>
<style lang="scss">
#picker {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #316daa;

    &.router-link-exact-active {
      color: #2ce290;
    }
  }
}
</style>
