<template>
  <div class="outer lb-progress" :class="[`lb-progress-${type}`]" ref="progress" @click="mousemove" :style="{width}">
    <span
      class="lb-progress_inner"
      :style="{[`${this.type == 'hz' ? 'width' : 'height'}`]: progessLang}"
    ></span>
    <div @mousedown="mousedown" class="circle" ref="circle" :style="{[`${this.type == 'hz' ? 'left' : 'top'}`]: position}"></div>
  </div>
</template>
<script>
let circle = null;
let progress = null;
export default {
  props: {
    value: {
      type: [String, Number],
      default: 1
    },
    type: {
      type: String,
      default: "hz"
    },
    width: {
      type: String,
      default: "100%"
    },
    max: {
      type: [String, Number],
      default: 1
    }
  },
  data() {
    return {
      progressTop: null,
      progressWidth: null,
      position: 0,
      valueSave: 0
    };
  },
  watch: {
    value: {
      handler(value) {
        const { max, type } = this;
        this.$nextTick(() => {
          const { width, height } = progress.getBoundingClientRect();
          if (type === "hz") {
            this.position = width * (value / max) + "px";
          } else {
            this.position = height - height * (value / max) + "px";
          }
        });
      },
      immediate: true
    }
  },
  computed: {
    progessLang: {
      get() {
        const { value, max } = this;
        return (value / max) * 100 + "%";
      }
    }
  },
  methods: {
    mousedown(ev) {
      ev.stopPropagation();
      window.addEventListener("mousemove", this.mousemove, false);
      window.addEventListener("mouseup", this.mouseup, false);
    },
    mousemove(ev) {
      const { clientX, clientY } = ev;
      const { x, y, width, height } = progress.getBoundingClientRect();
      let obj = {
        vl: {
          mouselang: clientY, // 鼠标据可视区的y值
          max: height, // 父元素高度
          defaultlang: clientY - y, // 正常情况下style值
          style: "top" // style 类型
        },
        hz: {
          mouselang: clientX,
          max: width,
          defaultlang: clientX - x,
          style: "left"
        }
      };
      let { mouselang, max, defaultlang, style } = obj[this.type];
      let position = defaultlang;
      if (position >= max) position = max;
      if (position <= 0) position = 0;
      circle.style[style] = position + "px";
      let value = position / max;
      this.valueSave = this.type == "vl" ? 1 - value : value;
      this.emitEvent("input", this.valueSave);
      ev.preventDefault();
    },
    mouseup(ev) {
      this.emitEvent("change", this.valueSave);
      window.removeEventListener("mousemove", this.mousemove);
      window.removeEventListener("mouseup", this.mouseup);
    },
    emitEvent(eventName, value) {
      this.$emit(eventName, value);
    }
  },
  mounted() {
    circle = this.$refs.circle;
    progress = this.$refs.progress;
  }
};
</script>
<style lang="scss">
.lb-progress {
  border-radius: 3px;
  background: #e4e7ed;
  position: relative;
  // overflow: hidden;
  // margin: 1000px 50px 0;
  span {
    border-radius: inherit;
    display: inline-block;
    background: black;
    position: absolute;
    z-index: 1;
  }
  .circle {
    z-index: 3;
    position: absolute;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    display: block;
    background: blue;
  }
  &-hz {
    width: 500px;
    height: 6px;
    span {
      left: 0;
      top: 0;
      width: 100%;
      height: 6px;
    }
    .circle {
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &-vl {
    width: 6px;
    height: 500px;
    span {
      left: 0;
      bottom: 0;
      width: 100%;
      display: block;
    }
    .circle {
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>