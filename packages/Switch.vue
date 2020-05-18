<template>

    <!-- <Switchs
      v-model="value"
      :custom-value="{ on: 1, off: 0 }"
      flag-color="whites"
      @change="change"
      switchWitch="50px"
    >
      <template #on>开启</template>
      <template #off>关闭</template>
    </Switchs> -->

  <div
    class="lb-switch"
    :style="{
      backgroundColor,
      width: switchWitch,
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
    switchWitch: {
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
<style lang="scss">
.lb-switch {
  display: inline-block;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.3s;
  user-select: none;
  cursor: pointer;
  .off-text,
  .on-text {
    line-height: 1;
    position: absolute;
    font-size: 12px;
    color: white;
  }
  .on-text {
    left: 4px;
  }
  .off-text {
    right: 4px;
  }
  .inner {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    // top: 1.5px;
    transition: all 0.3s;
    &.off {
      left: 2px;
    }
    &.on {
      left: 100%;
      margin-left: -18px;
    }
  }
}
</style>