<template>
  <div
    class="lb-switch"
    :class="{disable}"
    :style="{
      backgroundColor,
      width: switchWidth,
      opacity:disable?'0.6':1
    }"
    @click="switchChange"
  >
    <span class="on-text" v-show="$slots.on && value == customValue.on">
      <slot name="on"></slot>
    </span>
    <span
      class="inner"
      :class="innerClass"
      :style="{
        backgroundColor: flagColor
      }"
    ></span>
    <span class="off-text" v-show="$slots.off && value == customValue.off">
      <slot name="off"></slot>
    </span>
  </div>
</template>
<script>
export default {
  name:'lb-switch',
  props: {
    value: {
      default: false
    },
    customValue: {
      type: Object,
      default: () => {
        return { on: true, off: false }
      }
    },
    onColor: {
      type: String,
      default: '#3eaf7c'
    },
    offColor: {
      type: String,
      default: '#dcdfe6'
    },
    flagColor: {
      type: String,
      default: 'white'
    },
    disable: {
      type: Boolean,
      default: false
    },
    switchWidth: {
      type: String,
      validator(width) {
        return true
      },
      default: '50px'
    },
  },
  model: {
    prop: 'value'
  },
  data() {
    return {
      // value:true  $emit(
    }
  },
  methods: {
    switchChange() {
      if(this.disable===true) return;
      const { value, customValue: { on, off }, $listeners: { change } } = this;
      const result = value === on ? off : on;
      this.$emit('input', result);
      change && this.$emit('change', result)
    }
  },
  computed: {
    backgroundColor() {
      const { value, customValue, onColor, offColor } = this;
      return value === customValue.on ? onColor : offColor;
    },
    innerClass() {
      const { value, customValue } = this;
      return value === customValue.on ? 'on' : 'off'
    }
  }
}
</script>

