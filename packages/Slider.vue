<template>
  <div
    class="lb-slider"
    :class="[`lb-slider-${type}`]"
    ref="slider"
    @click="mousemove($event,'click')"
    :style="{[type==='hz'?'width':'height']:lang}"
  >
    <span
      class="lb-slider_inner"
      :style="{[`${this.type == 'hz' ? 'width' : 'height'}`]: progessLang}"
    ></span>
    <div
      @mousedown="mousedown"
      class="circle"
      ref="circle"
      :style="{[`${this.type === 'hz' ? 'left' : 'top'}`]: position}"
    ></div>
  </div>
</template>
<script>
export default {
  name: "lb-slider",
  props: {
    values: {
      type: [String, Number],
      default: 1
    },
    type: {
      type: String,
      default: "hz"
    },
    lang: {
      type: String,
      default: "100%"
    },
    max: {
      type: [String, Number],
      default: 1
    }
  },
  model: {
    prop: "values"
  },
  data() {
    return {
      sliderTop: null,
      sliderWidth: null,
      position: 0,
      valueSave: 0,
      state: "default",
      value: 0
    };
  },
  watch: {
    values: {
      handler(value) {
        if (this.state === "moving") return;
        this.valueSave = value;
      },
      immediate: true
    },
    state: {
      handler(state) {
        if (state === "moving") {
          this.value = this.valueSave;
        } else {
          this.value = this.values;
        }
      },
      immediate: true
    },
    valueSave: {
      handler(value) {
        const { max, type, state } = this;

        this.$nextTick(() => {
          const { width, height } = this.$refs.slider.getBoundingClientRect();
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
        const { valueSave, max } = this;
        return (valueSave / max) * 100 + "%";
      }
    }
  },
  methods: {
    mousedown(ev) {
      this.state = "moving";
      ev.stopPropagation();
      window.addEventListener("mousemove", this.mousemove, false);
      window.addEventListener("mouseup", this.mouseup, false);
    },
    mousemove(ev, type) {
      const { clientX, clientY } = ev;
      const { x, y, width, height } = this.$refs.slider.getBoundingClientRect();
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
      this.$refs.circle.style[style] = position + "px";
      let value = position / max;
      this.valueSave = this.type == "vl" ? 1 - value : value;
      this.emitEvent("input", this.valueSave);
      type && this.emitEvent('change',this.valueSave)
      ev.preventDefault();
    },
    mouseup(ev) {
      this.state = "default";
      this.emitEvent("change", this.valueSave);
      window.removeEventListener("mousemove", this.mousemove);
      window.removeEventListener("mouseup", this.mouseup);
    },
    emitEvent(eventName, value) {
      this.$emit(eventName, value);
    }
  }
};
</script>