<template>
  <button
    class="lb-button"
    :class="buttonClass"
    :disabled="disabled"
    @click="buttonEvent('click',$event)"
    @mouseenter="buttonEvent('mouseenter',$event)"
    @mouseleave="buttonEvent('mouseleave',$event)"
    @mousemove="buttonEvent('mousemove',$event)"
    @mouseover="buttonEvent('mouseover',$event)"
    @mouseup="buttonEvent('mouseup',$event)"
  >
    <i v-if="circle||icon" :class="[icon]"></i>
    <span v-if="!circle">
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: "lb-button",
  props: {
    type: {
      type: String,
      default: "",
      validator(type) {
        if (
          type &&
          !["warning", "success", "danger", "info", "primary"].includes(type)
        ) {
          console.error(
            `type必须是${["warning,success", "danger", "info", "primary"].join(
              ","
            )}`
          );
        }
        return true;
      }
    },
    icon: {
      type: String,
      default: ""
    },
    circle: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    plant: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClass() {
      let classes = [];
      if (this.type) {
        classes.push(`lb-button_${this.type}`);
      } else {
        classes.push("lb-button_default");
      }
      this.circle && classes.push(`lb-button_circle`);
      this.round && classes.push(`lb-button_round`);
      this.plant && classes.push(`lb-button_plant`);
      this.disabled && classes.push("lb-button_disabled");
      return classes;
    }
  },
  methods: {
    buttonEvent(type,ev) {
      this.$emit(type, ev);
    }
  }
};
</script>